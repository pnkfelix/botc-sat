// Test the setup function against known correct values
import { getBaseSetup } from './roles';

export function testSetupFunction(): void {
    console.log("Testing setup function...");
    
    const testCases = [
        { players: 5, expected: { Townsfolk: 3, Outsider: 0, Minion: 1, Demon: 1 } },
        { players: 6, expected: { Townsfolk: 3, Outsider: 1, Minion: 1, Demon: 1 } },
        { players: 7, expected: { Townsfolk: 5, Outsider: 0, Minion: 1, Demon: 1 } },
        { players: 8, expected: { Townsfolk: 5, Outsider: 1, Minion: 1, Demon: 1 } },
        { players: 9, expected: { Townsfolk: 5, Outsider: 2, Minion: 1, Demon: 1 } },
        { players: 10, expected: { Townsfolk: 7, Outsider: 0, Minion: 2, Demon: 1 } },
        { players: 11, expected: { Townsfolk: 7, Outsider: 1, Minion: 2, Demon: 1 } },
        { players: 12, expected: { Townsfolk: 7, Outsider: 2, Minion: 2, Demon: 1 } },
        { players: 13, expected: { Townsfolk: 9, Outsider: 0, Minion: 3, Demon: 1 } },
        { players: 14, expected: { Townsfolk: 9, Outsider: 1, Minion: 3, Demon: 1 } },
        { players: 15, expected: { Townsfolk: 9, Outsider: 2, Minion: 3, Demon: 1 } },
    ];
    
    let passed = 0;
    let failed = 0;
    
    for (const testCase of testCases) {
        const result = getBaseSetup(testCase.players);
        const match = (
            result.Townsfolk === testCase.expected.Townsfolk &&
            result.Outsider === testCase.expected.Outsider &&
            result.Minion === testCase.expected.Minion &&
            result.Demon === testCase.expected.Demon
        );
        
        if (match) {
            console.log(`✅ ${testCase.players} players: ${JSON.stringify(result)}`);
            passed++;
        } else {
            console.log(`❌ ${testCase.players} players: got ${JSON.stringify(result)}, expected ${JSON.stringify(testCase.expected)}`);
            failed++;
        }
    }
    
    console.log(`\nSetup tests: ${passed} passed, ${failed} failed`);
    if (failed === 0) {
        console.log("✅ All setup tests passed!");
    }
}