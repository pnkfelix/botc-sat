import { describe, it, expect } from 'vitest';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(require('child_process').exec);

describe('Examples Integration Tests', () => {
    // Get all example files
    const examplesDir = path.join(__dirname, '../../examples');
    const exampleFiles = fs.readdirSync(examplesDir)
        .filter(file => file.endsWith('.js'))
        .sort(); // Ensure consistent test order

    // Extract documented command-line arguments from README.md
    const getExampleArgsFromReadme = (): Map<string, string[]> => {
        const readmePath = path.join(__dirname, '../../README.md');
        const readmeContent = fs.readFileSync(readmePath, 'utf8');
        const argsMap = new Map<string, string[]>();
        
        // Find all documented example commands in README
        // Look for commands that are in code blocks (indented or fenced) and not comments
        const lines = readmeContent.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Skip comment lines that start with #
            if (line.startsWith('#')) continue;
            
            // Look for node commands in the line
            const commandMatch = line.match(/^node examples\/([^.\s]+\.js)(?:\s+(.+))?$/);
            if (commandMatch) {
                const filename = commandMatch[1];
                const argsString = commandMatch[2] || '';
                
                // Parse arguments, handling quoted strings properly
                const args: string[] = [];
                if (argsString.trim()) {
                    // Simple argument parsing - handles quoted strings with spaces
                    const argPattern = /(?:"([^"]+)"|(\S+))/g;
                    let argMatch;
                    while ((argMatch = argPattern.exec(argsString)) !== null) {
                        args.push(argMatch[1] || argMatch[2]);
                    }
                }
                
                argsMap.set(filename, args);
            }
        }
        
        return argsMap;
    };

    const readmeArgs = getExampleArgsFromReadme();

    // Test each example file individually (in parallel for faster execution)
    exampleFiles.forEach(filename => {
        it.concurrent(`should run ${filename} without runtime errors`, async () => {
            const filePath = path.join(examplesDir, filename);
            
            // Get command-line arguments from README documentation
            const args = readmeArgs.get(filename) || [];
            const argsString = args.map(arg => `"${arg}"`).join(' ');
            const command = `node "${filePath}" ${argsString}`.trim();
            
            // Track if this example is documented in README for error reporting
            
            try {
                // Run the example file with a reasonable timeout
                const { stderr } = await execAsync(command, {
                    timeout: 30000, // 30 second timeout
                    cwd: path.join(__dirname, '../..'), // Run from project root
                    maxBuffer: 1024 * 1024 // 1MB buffer for output
                });
                
                // Success if no exception was thrown
                // We don't validate output content - just that it runs without error
                
                // Only log errors - suppress success output for cleaner test runs
                if (stderr && stderr.trim()) {
                    console.warn(`⚠️  ${filename} had stderr output: ${stderr.trim()}`);
                }
                
            } catch (error) {
                // Provide detailed error information for debugging
                const errorDetails = error as any;
                let errorMessage = `Failed to execute ${filename}`;
                
                // Check if this looks like a missing documentation issue
                if (!readmeArgs.has(filename) && errorDetails.code === 1) {
                    errorMessage += `\n\n🚨 POTENTIAL DOCUMENTATION BUG: ${filename} is not documented in README.md`;
                    errorMessage += `\n   Examples that require command-line arguments must be documented in the README.`;
                    errorMessage += `\n   Either add this example to README.md with proper arguments, or modify it to accept zero arguments.`;
                }
                
                if (errorDetails.code) {
                    errorMessage += ` (exit code: ${errorDetails.code})`;
                }
                
                if (errorDetails.stdout) {
                    errorMessage += `\n  stdout: ${errorDetails.stdout}`;
                }
                
                if (errorDetails.stderr) {
                    errorMessage += `\n  stderr: ${errorDetails.stderr}`;
                }
                
                if (errorDetails.message) {
                    errorMessage += `\n  error: ${errorDetails.message}`;
                }
                
                throw new Error(errorMessage);
            }
        }, 35000); // 35 second timeout for the test itself
    });

    // Summary test that ensures we actually found example files
    it('should have found example files to test', () => {
        expect(exampleFiles.length).toBeGreaterThan(0);
        // Suppress console output for cleaner test runs
    });

    // Verify that all documented examples in README actually exist
    it('should have all README-documented examples present as files', () => {
        const missingFiles: string[] = [];
        
        for (const [filename] of readmeArgs) {
            if (!exampleFiles.includes(filename)) {
                missingFiles.push(filename);
            }
        }
        
        if (missingFiles.length > 0) {
            throw new Error(
                `README.md documents examples that don't exist:\n` +
                missingFiles.map(file => `  - ${file}`).join('\n') +
                `\n\nEither create these missing example files or remove them from README.md`
            );
        }
        
        // All examples exist - suppress success output for cleaner test runs
    });

    // Test that all examples are using the current API (no deprecated methods)
    it('should not use deprecated API patterns', async () => {
        const deprecatedPatterns = [
            /\.mode\s*=\s*['"]min-area['"]/,     // Deprecated layout mode
            /\.mode\s*=\s*['"]old-auto['"]/,     // Old auto mode name
            /showNumbers:\s*true/,               // Old option name (should be showColumnNumbers)
        ];
        
        let foundDeprecatedUsage = false;
        const issues: string[] = [];
        
        for (const filename of exampleFiles) {
            const filePath = path.join(examplesDir, filename);
            const content = fs.readFileSync(filePath, 'utf8');
            
            for (const pattern of deprecatedPatterns) {
                if (pattern.test(content)) {
                    foundDeprecatedUsage = true;
                    issues.push(`${filename} uses deprecated pattern: ${pattern.source}`);
                }
            }
        }
        
        if (foundDeprecatedUsage) {
            throw new Error(
                `Found deprecated API usage in examples:\n` +
                issues.map(issue => `  - ${issue}`).join('\n') +
                `\n\nThese examples should be updated to use current API patterns.`
            );
        }
        
        // All examples use current API patterns - suppress success output
    });
});