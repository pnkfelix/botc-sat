/**
 * ASCII grimoire rendering implementation
 * 
 * Renders BOTC grimoire state as ASCII art with bubble column format for tokens.
 * Supports hybrid dense/justified spacing algorithm for optimal visual layout.
 */

import { GrimoireState, PlayerState } from '../core/grimoire';
import { RenderOptions, TurnBasedLayout, PlayerPosition, AbstractGrid, GridCell } from './types';
import { formatReminderTokens } from './token-formatter';

/**
 * Structured formatting result with decoration boundaries
 */
interface FormattedText {
    leftDeco: string;
    content: string; 
    rightDeco: string;
    full: string; // Complete formatted string
}

/**
 * Formats player name and role with structured decoration boundaries.
 *
 * @param player - The player to format
 * @param options - Render options that may override formatting behavior
 * @returns Object with structured formatted name and role
 */
function formatPlayerStructured(player: PlayerState, options?: RenderOptions): { name: FormattedText; role: FormattedText } {
    const formatText = (text: string): FormattedText => {
        // For layout evaluation, always use worst-case formatting to ensure robust layouts
        if (options?._forceWorstCaseFormatting) {
            return {
                leftDeco: '*~~',
                content: text,
                rightDeco: '~~*',
                full: `*~~${text}~~*`
            };
        }
        
        if (player.alive) {
            // Living player - no formatting
            return {
                leftDeco: '',
                content: text,
                rightDeco: '',
                full: text
            };
        } else if (player.ghost) {
            // Dead with ghost vote available - use asterisks
            return {
                leftDeco: '*',
                content: text,
                rightDeco: '*',
                full: `*${text}*`
            };
        } else {
            // Dead with used ghost vote - use strikethrough
            return {
                leftDeco: '*~~',
                content: text,
                rightDeco: '~~*',
                full: `*~~${text}~~*`
            };
        }
    };
    
    return {
        name: formatText(player.name),
        role: formatText(player.role)
    };
}

/**
 * Legacy function for backward compatibility
 * Formats player name and role with visual indicators for dead players.
 * 
 * @param player - The player to format
 * @param options - Render options that may override formatting behavior
 * @returns Object with formatted name and role strings
 */
function formatPlayerDisplayText(player: PlayerState, options?: RenderOptions): { name: string; role: string } {
    const structured = formatPlayerStructured(player, options);
    return {
        name: structured.name.full,
        role: structured.role.full
    };
}

/**
 * Calculates the display width needed for a player (name, role, and tokens).
 * Takes into account formatting for dead players.
 * 
 * @param player - The player to measure
 * @param useAbbreviations - Whether to use abbreviations for tokens
 * @param options - Render options that may override formatting behavior
 * @returns Maximum width needed for this player's display
 */
function getPlayerDisplayWidth(player: PlayerState, useAbbreviations: boolean, options?: RenderOptions): number {
    const { name, role } = formatPlayerDisplayText(player, options);
    const nameWidth = name.length;
    const roleWidth = role.length;
    
    // Format tokens with abbreviations before calculating width
    const formattedTokens = formatReminderTokens(player.tokens, useAbbreviations);
    const longestTokenWidth = formattedTokens.length > 0 ? 
        Math.max(...formattedTokens.map(token => `(${token})`.length)) : 0;
    
    return Math.max(nameWidth, roleWidth, longestTokenWidth);
}

export function renderGrimoireToAsciiArt(grimoire: GrimoireState, options: RenderOptions = { mode: 'auto', showColumnNumbers: true, useAbbreviations: true }): string {
    const players = grimoire.players;
    
    if (options.mode === 'explicit-turns') {
        if (!options.explicitTurns) {
            throw new Error('explicitTurns must be provided when mode is explicit-turns');
        }
        const [topCount, rightCount, bottomCount, leftCount] = options.explicitTurns;
        const layout: TurnBasedLayout = { topCount, rightCount, bottomCount, leftCount };
        return renderTurnBasedLayout(players, layout, options);
    } else if (options.mode === 'auto') {
        // Auto mode: Use 80-character width-constrained layout for optimal display compatibility
        const autoOptions = { ...options, targetWidth: 80 };
        const bestLayout = findBestTurnConfigurationByWidthConstraint(players, autoOptions);
        return renderTurnBasedLayout(players, bestLayout, options);
    } else if (options.mode === 'squariness') {
        // Find the best turn configuration via exhaustive search (squareness-based)
        const bestLayout = findBestTurnConfiguration(players, options);
        return renderTurnBasedLayout(players, bestLayout, options);
    } else if (options.mode === 'min-area') {
        // Find the best turn configuration via area minimization
        const bestLayout = findBestTurnConfigurationByArea(players, options);
        return renderTurnBasedLayout(players, bestLayout, options);
    } else if (options.mode === 'min-max-dim') {
        // Find the best turn configuration via maximum dimension minimization
        const bestLayout = findBestTurnConfigurationByMaxDim(players, options);
        return renderTurnBasedLayout(players, bestLayout, options);
    } else if (options.mode === 'min-perimeter') {
        // Find the best turn configuration via perimeter minimization
        const bestLayout = findBestTurnConfigurationByPerimeter(players, options);
        return renderTurnBasedLayout(players, bestLayout, options);
    } else if (options.mode === 'max-area-perimeter-ratio') {
        // Find the best turn configuration via area-to-perimeter ratio maximization
        const bestLayout = findBestTurnConfigurationByAreaPerimeterRatio(players, options);
        return renderTurnBasedLayout(players, bestLayout, options);
    } else if (options.mode === 'max-area-perimeter2-ratio') {
        // Find the best turn configuration via area-to-perimeter-squared ratio maximization  
        const bestLayout = findBestTurnConfigurationByAreaPerimeter2Ratio(players, options);
        return renderTurnBasedLayout(players, bestLayout, options);
    } else if (options.mode === 'width-constrained') {
        // Find the best turn configuration that maximizes width usage without exceeding target
        if (!options.targetWidth) {
            throw new Error('targetWidth must be provided when mode is width-constrained');
        }
        const bestLayout = findBestTurnConfigurationByWidthConstraint(players, options);
        return renderTurnBasedLayout(players, bestLayout, options);
    } else if (options.mode === 'height-constrained') {
        // Find the best turn configuration that maximizes height usage without exceeding target
        if (!options.targetHeight) {
            throw new Error('targetHeight must be provided when mode is height-constrained');
        }
        const bestLayout = findBestTurnConfigurationByHeightConstraint(players, options);
        return renderTurnBasedLayout(players, bestLayout, options);
    } else {
        // For constrained modes, we'll implement this later
        throw new Error(`${options.mode} mode not yet implemented`);
    }
}

function generateAllTurnConfigurations(playerCount: number): TurnBasedLayout[] {
    const configurations: TurnBasedLayout[] = [];
    
    // Try all possible ways to distribute players among 4 sides
    // topCount + rightCount + bottomCount + leftCount = playerCount
    for (let topCount = 1; topCount <= playerCount; topCount++) {
        for (let rightCount = 0; rightCount <= playerCount - topCount; rightCount++) {
            for (let bottomCount = 0; bottomCount <= playerCount - topCount - rightCount; bottomCount++) {
                const leftCount = playerCount - topCount - rightCount - bottomCount;
                if (leftCount >= 0) {
                    configurations.push({ topCount, rightCount, bottomCount, leftCount });
                }
            }
        }
    }
    
    return configurations;
}

function renderTurnBasedLayout(players: any[], layout: TurnBasedLayout, options: RenderOptions): string {
    // 1. Assign players to sides based on turn configuration
    const playerPositions = assignPlayersToSides(players, layout);
    
    // 2. For perfect border stability, calculate grid bounds using worst-case scenario
    const coordinateOptions: RenderOptions = {
        ...options,
        _forceWorstCaseFormatting: true
    };
    
    // 3. Calculate worst-case grid bounds by creating both alive and dead versions
    const worstCaseGrid = createAbstractGrid(playerPositions, coordinateOptions, coordinateOptions);
    const actualGrid = createAbstractGrid(playerPositions, coordinateOptions, options);
    
    // 4. Use worst-case bounds but actual content for perfect stability
    const stableGrid = {
        ...actualGrid,
        maxCol: worstCaseGrid.maxCol,  // Use worst-case width for stability
        maxRow: worstCaseGrid.maxRow   // Use worst-case height for stability
    };
    
    // 5. Convert to final ASCII art with stable dimensions
    return renderAbstractGrid(stableGrid, players.length, options);
}

/**
 * Calculate V-shaped column positions for side players.
 * Creates inverted-V (^) pattern where middle player is least indented (closest to edge).
 * 
 * @param playerCount - Number of players on this side
 * @param baseColumn - Base column position (edge position)
 * @param maxIndentation - Maximum indentation from base column
 * @param isLeftSide - If true, indents inward from left edge; if false, indents inward from right edge
 * @returns Array of column positions, one per player
 */
function calculateVShapedColumns(playerCount: number, baseColumn: number, maxIndentation: number, isLeftSide: boolean): number[] {
    if (playerCount === 0) return [];
    if (playerCount === 1) return [baseColumn];
    
    const positions: number[] = [];
    const middleIndex = Math.floor(playerCount / 2);
    
    for (let i = 0; i < playerCount; i++) {
        let indentation: number;
        
        // For normal symmetry: 
        // Left side: middle players closest to left edge (min indentation)
        // Right side: middle players closest to left edge (max indentation from right)
        
        const distanceFromMiddle = Math.abs(i - middleIndex);
        const maxDistance = Math.max(middleIndex, playerCount - middleIndex - 1);
        
        if (maxDistance === 0) {
            // Only one player (middle)
            indentation = isLeftSide ? 0 : maxIndentation;
        } else {
            if (isLeftSide) {
                // Left side: middle players have min indentation (closest to left edge)
                indentation = maxIndentation * distanceFromMiddle / maxDistance;
            } else {
                // Right side: middle players have max indentation (furthest from right edge)
                indentation = maxIndentation * (1 - distanceFromMiddle / maxDistance);
            }
        }
        
        // Apply indentation direction based on side
        if (isLeftSide) {
            positions.push(baseColumn + Math.round(indentation));
        } else {
            positions.push(baseColumn - Math.round(indentation));
        }
    }
    
    return positions;
}

function assignPlayersToSides(players: any[], layout: TurnBasedLayout): PlayerPosition[] {
    const result: PlayerPosition[] = [];
    let playerIndex = 0;
    
    // Top side (left to right)
    for (let i = 0; i < layout.topCount; i++) {
        result.push({
            player: players[playerIndex++],
            side: 'top',
            sideIndex: i
        });
    }
    
    // Right side (top to bottom)  
    for (let i = 0; i < layout.rightCount; i++) {
        result.push({
            player: players[playerIndex++],
            side: 'right',
            sideIndex: i
        });
    }
    
    // Bottom side (right to left) - reverse the order for clockwise flow
    const bottomPlayers = [];
    for (let i = 0; i < layout.bottomCount; i++) {
        bottomPlayers.push(players[playerIndex++]);
    }
    for (let i = bottomPlayers.length - 1; i >= 0; i--) {
        result.push({
            player: bottomPlayers[i],
            side: 'bottom',
            sideIndex: layout.bottomCount - 1 - i
        });
    }
    
    // Left side (bottom to top)
    for (let i = 0; i < layout.leftCount; i++) {
        result.push({
            player: players[playerIndex++],
            side: 'left',
            sideIndex: i
        });
    }
    
    return result;
}

function calculateJustifiedPositions(topPlayers: PlayerPosition[], _rightPlayers: PlayerPosition[], bottomPlayers: PlayerPosition[], leftPlayers: PlayerPosition[], options: RenderOptions): { top: number[]; right: number[]; bottom: number[]; left: number[] } {
    const minGap = 2; // Minimum gap between players
    const leftPadding = 2; // Space from left edge
    
    // Calculate the maximum rightmost extent of left-side players to avoid overlap
    let maxLeftExtent = leftPadding; // Default if no left players
    if (leftPlayers.length > 0) {
        // Calculate V-shaped positions for left players
        const leftBaseCol = 1;
        const leftMaxIndent = Math.min(8, Math.floor(leftPlayers.length * 1.5));
        const leftColumns = calculateVShapedColumns(leftPlayers.length, leftBaseCol, leftMaxIndent, true);
        
        // Find the maximum extent (position + player width)
        maxLeftExtent = Math.max(...leftPlayers.map((pos, i) => {
            const leftCol = leftColumns[i];
            const playerWidth = getPlayerDisplayWidth(pos.player, options.useAbbreviations ?? true, options);
            return leftCol + playerWidth;
        }));
    }
    
    // Calculate dense (minimum) layout for each side
    const getDenseLayout = (players: PlayerPosition[], startCol: number) => {
        const positions: number[] = [];
        let currentCol = startCol;
        
        for (let i = 0; i < players.length; i++) {
            positions.push(currentCol);
            if (i < players.length - 1) {
                // Consider name, role, and longest token when calculating width
                const textWidth = getPlayerDisplayWidth(players[i].player, options.useAbbreviations ?? true, options);
                currentCol += textWidth + minGap;
            }
        }
        
        // Calculate the width of this dense layout
        const lastPlayer = players[players.length - 1];
        const lastPlayerWidth = players.length > 0 ? 
            getPlayerDisplayWidth(lastPlayer.player, options.useAbbreviations ?? true, options) : 0;
        const totalWidth = currentCol + lastPlayerWidth - startCol;
        
        return { positions, totalWidth };
    };
    
    // Calculate dense layouts for top and bottom, ensuring they start right of left players
    const topStartCol = Math.max(leftPadding + 2, maxLeftExtent + minGap);
    const bottomStartCol = Math.max(leftPadding - 1, maxLeftExtent + minGap);
    
    const topDense = getDenseLayout(topPlayers, topStartCol);
    const bottomDense = getDenseLayout(bottomPlayers, bottomStartCol);
    
    // Handle cases where one or both sides are empty
    let topPositions: number[];
    let bottomPositions: number[];
    
    if (topPlayers.length === 0) {
        // No top players - use dense layout for bottom only
        topPositions = [];
        bottomPositions = bottomDense.positions;
    } else if (bottomPlayers.length === 0) {
        // No bottom players - use dense layout for top only  
        topPositions = topDense.positions;
        bottomPositions = [];
    } else {
        // Both sides have players - use hybrid dense/justified algorithm
        const topIsLonger = topDense.totalWidth > bottomDense.totalWidth;
        
        if (topIsLonger) {
            // Top is longer - keep top dense, justify bottom to match top's width
            topPositions = topDense.positions;
            bottomPositions = justifyToWidth(bottomPlayers, bottomStartCol, topDense.totalWidth, options);
        } else {
            // Bottom is longer - keep bottom dense, justify top to match bottom's width  
            bottomPositions = bottomDense.positions;
            topPositions = justifyToWidth(topPlayers, topStartCol, bottomDense.totalWidth, options);
        }
    }
    
    return {
        top: topPositions,
        right: [], // Right side doesn't use justified spacing yet
        bottom: bottomPositions,
        left: [] // Left side not implemented yet
    };
}

function justifyToWidth(players: PlayerPosition[], startCol: number, targetWidth: number, options: RenderOptions): number[] {
    if (players.length === 0) return [];
    if (players.length === 1) return [startCol];
    
    const minGap = 2;
    const positions: number[] = [];
    
    // Calculate total text width (including tokens)
    const totalTextWidth = players.reduce((sum, pos) => {
        return sum + getPlayerDisplayWidth(pos.player, options.useAbbreviations ?? true, options);
    }, 0);
    
    // Calculate available space for gaps
    const availableGapSpace = targetWidth - totalTextWidth;
    const numGaps = players.length - 1;
    const gapSize = numGaps > 0 ? availableGapSpace / numGaps : 0;
    
    // Ensure we don't go below minimum gap
    const actualGapSize = Math.max(minGap, gapSize);
    
    let currentCol = startCol;
    for (let i = 0; i < players.length; i++) {
        positions.push(Math.round(currentCol));
        if (i < players.length - 1) {
            const textWidth = getPlayerDisplayWidth(players[i].player, options.useAbbreviations ?? true, options);
            currentCol += textWidth + actualGapSize;
        }
    }
    
    return positions;
}

/**
 * Groups players into top-set and bottom-set for token bubble line rendering.
 * Top-set: top side + upper half of left/right sides
 * Bottom-set: bottom side + lower half of left/right sides
 */
function groupPlayersIntoSets(topPlayers: PlayerPosition[], rightPlayers: PlayerPosition[], 
                             bottomPlayers: PlayerPosition[], leftPlayers: PlayerPosition[]) {
    const topSet: PlayerPosition[] = [];
    const bottomSet: PlayerPosition[] = [];
    
    // Top side players go to top-set
    topSet.push(...topPlayers);
    
    // Bottom side players go to bottom-set
    bottomSet.push(...bottomPlayers);
    
    // Left side: upper half to top-set, lower half to bottom-set
    const leftMidpoint = Math.floor(leftPlayers.length / 2);
    topSet.push(...leftPlayers.slice(0, leftMidpoint));
    bottomSet.push(...leftPlayers.slice(leftMidpoint));
    
    // Right side: upper half to top-set, lower half to bottom-set
    const rightMidpoint = Math.floor(rightPlayers.length / 2);
    topSet.push(...rightPlayers.slice(0, rightMidpoint));
    bottomSet.push(...rightPlayers.slice(rightMidpoint));
    
    return { topSet, bottomSet };
}

/**
 * Creates token bubble lines using right-to-left scanning with collision avoidance.
 * Draws vertical () lines extending upward for top-set, downward for bottom-set.
 * Places tokens as close as possible to players, only extending further when conflicts arise.
 * 
 * CRITICAL: Ensures unique column constraint within each set by detecting and resolving conflicts.
 */
function createTokenBubbleLines(topSet: PlayerPosition[], bottomSet: PlayerPosition[], 
                               positions: any, _tokenStartRow: number, _tokenRows: number, bottomRow: number,
                               nameRow: number, roleRow: number, leftStartRow: number,
                               options: RenderOptions): GridCell[] {
    const cells: GridCell[] = [];
    
    // Get all players with tokens and their column positions, detecting conflicts
    const topSetPlayersWithTokens: Array<{
        player: PlayerPosition;
        column: number;
        tokens: string[];
    }> = [];
    
    const bottomSetPlayersWithTokens: Array<{
        player: PlayerPosition;
        column: number;
        tokens: string[];
    }> = [];
    
    // Process top-set players with tokens
    topSet.forEach(pos => {
        if (pos.player.tokens.length > 0) {
            const column = getPlayerColumn(pos, positions);
            topSetPlayersWithTokens.push({
                player: pos,
                column,
                tokens: formatReminderTokens(pos.player.tokens, options.useAbbreviations ?? true)
            });
        }
    });
    
    // Process bottom-set players with tokens  
    bottomSet.forEach(pos => {
        if (pos.player.tokens.length > 0) {
            const column = getPlayerColumn(pos, positions);
            bottomSetPlayersWithTokens.push({
                player: pos,
                column,
                tokens: formatReminderTokens(pos.player.tokens, options.useAbbreviations ?? true)
            });
        }
    });
    
    // Resolve column conflicts within top-set (unique column constraint)
    const resolvedTopSet = resolveColumnConflicts(topSetPlayersWithTokens);
    
    // Resolve column conflicts within bottom-set (unique column constraint)  
    const resolvedBottomSet = resolveColumnConflicts(bottomSetPlayersWithTokens);
    
    // Track occupied positions to avoid collisions between different players' bubble lines
    const occupiedPositions = new Set<string>();
    
    // RIGHT-TO-LEFT SCAN: Process top-set players from right to left so rightmost get shortest lines
    const topSetSorted = resolvedTopSet.sort((a, b) => b.column - a.column);
    for (const playerData of topSetSorted) {
        const { column, tokens } = playerData;
        
        // Find where this player is positioned
        const playerRow = getPlayerRow(playerData.player, positions, nameRow, roleRow, leftStartRow, bottomRow);
        
        // Start bubble line from just above the player (or column number if shown)
        const columnNumberOffset = options.showColumnNumbers ? 1 : 0;
        const bubbleStartRow = playerRow - 1 - columnNumberOffset; // Start above column number or name
        
        let currentRow = bubbleStartRow;
        
        // Place tokens first, starting as close as possible to the player
        const tokenStartRow = findFirstAvailableTokenPosition(currentRow, column, tokens.length, occupiedPositions, 'upward');
        
        // Place actual tokens starting from the closest available position
        let tokenRow = tokenStartRow;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];  
            // Find next available row for this token
            while (occupiedPositions.has(`${tokenRow},${column}`)) {
                tokenRow--;
            }
            cells.push({ content: `(${token})`, row: tokenRow, col: column });
            occupiedPositions.add(`${tokenRow},${column}`);
            tokenRow--;
        }
        
        // Now place () placeholders to connect player to tokens (if needed)
        let connectRow = bubbleStartRow;
        const highestTokenRow = tokenStartRow - tokens.length + 1;
        while (connectRow > highestTokenRow) {
            if (!occupiedPositions.has(`${connectRow},${column}`)) {
                cells.push({ content: '()', row: connectRow, col: column });
                occupiedPositions.add(`${connectRow},${column}`);
            }
            connectRow--;
        }
    }
    
    // RIGHT-TO-LEFT SCAN: Process bottom-set players from right to left  
    const bottomSetSorted = resolvedBottomSet.sort((a, b) => b.column - a.column);
    for (const playerData of bottomSetSorted) {
        const { column, tokens } = playerData;
        
        // Find where this player is positioned  
        const playerRow = getPlayerRow(playerData.player, positions, nameRow, roleRow, leftStartRow, bottomRow);
        
        // Start bubble line from just below the player (or column number if shown)
        const columnNumberOffset = options.showColumnNumbers ? 1 : 0;
        const bubbleStartRow = playerRow + 2 + columnNumberOffset; // Start below role + optional column number
        
        let currentRow = bubbleStartRow;
        
        // Place tokens first, starting as close as possible to the player
        const tokenStartRow = findFirstAvailableTokenPosition(currentRow, column, tokens.length, occupiedPositions, 'downward');
        
        // Place actual tokens starting from the closest available position
        let tokenRow = tokenStartRow;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];  
            // Find next available row for this token
            while (occupiedPositions.has(`${tokenRow},${column}`)) {
                tokenRow++;
            }
            cells.push({ content: `(${token})`, row: tokenRow, col: column });
            occupiedPositions.add(`${tokenRow},${column}`);
            tokenRow++;
        }
        
        // Now place () placeholders to connect player to tokens (if needed)
        let connectRow = bubbleStartRow;
        const lowestTokenRow = tokenStartRow + tokens.length - 1;
        while (connectRow < lowestTokenRow) {
            if (!occupiedPositions.has(`${connectRow},${column}`)) {
                cells.push({ content: '()', row: connectRow, col: column });
                occupiedPositions.add(`${connectRow},${column}`);
            }
            connectRow++;
        }
    }
    
    return cells;
}

/**
 * Finds the first available position to start placing tokens, going in the specified direction.
 * This ensures tokens are placed as close as possible to the player.
 */
function findFirstAvailableTokenPosition(startRow: number, column: number, tokenCount: number, 
                                       occupiedPositions: Set<string>, direction: 'upward' | 'downward'): number {
    let candidateRow = startRow;
    
    if (direction === 'upward') {
        // For upward direction, find the highest position where we can fit all tokens
        // Check if we can fit tokenCount consecutive rows starting from candidateRow going up
        while (true) {
            let canFitAll = true;
            for (let i = 0; i < tokenCount; i++) {
                const checkRow = candidateRow - i;
                if (occupiedPositions.has(`${checkRow},${column}`)) {
                    canFitAll = false;
                    break;
                }
            }
            
            if (canFitAll) {
                return candidateRow; // Return the highest row where tokens will start
            }
            
            candidateRow--; // Try one row higher
        }
    } else {
        // For downward direction, find the lowest position where we can fit all tokens
        // Check if we can fit tokenCount consecutive rows starting from candidateRow going down
        while (true) {
            let canFitAll = true;
            for (let i = 0; i < tokenCount; i++) {
                const checkRow = candidateRow + i;
                if (occupiedPositions.has(`${checkRow},${column}`)) {
                    canFitAll = false;
                    break;
                }
            }
            
            if (canFitAll) {
                return candidateRow; // Return the lowest row where tokens will start
            }
            
            candidateRow++; // Try one row lower
        }
    }
}

/**
 * Resolves column conflicts within a set by adjusting positions to ensure uniqueness.
 * This is critical for the user's specified invariant that each player in a set gets a unique column.
 */
function resolveColumnConflicts(playersWithTokens: Array<{
    player: PlayerPosition;
    column: number;
    tokens: string[];
}>): Array<{
    player: PlayerPosition;
    column: number;
    tokens: string[];
}> {
    if (playersWithTokens.length <= 1) {
        return playersWithTokens; // No conflicts possible
    }
    
    // Sort by original column position
    const sorted = [...playersWithTokens].sort((a, b) => a.column - b.column);
    
    // Check for conflicts and resolve by spreading players apart
    const resolved = [sorted[0]]; // First player keeps original position
    
    for (let i = 1; i < sorted.length; i++) {
        const currentPlayer = sorted[i];
        const previousPlayer = resolved[resolved.length - 1];
        
        // Ensure minimum separation of 3 columns to avoid overlap
        const minColumn = previousPlayer.column + 3;
        const adjustedColumn = Math.max(currentPlayer.column, minColumn);
        
        resolved.push({
            ...currentPlayer,
            column: adjustedColumn
        });
    }
    
    return resolved;
}

/**
 * Gets the row position where a player's name is displayed
 */
function getPlayerRow(player: PlayerPosition, _positions: any, nameRow: number, roleRow: number, leftStartRow: number, bottomRow: number): number {
    switch (player.side) {
        case 'top':
            return nameRow;
        case 'bottom':
            // Bottom players are positioned at the actual bottomRow that was calculated
            return bottomRow + (player.sideIndex * 0); // All bottom players at same row, different columns
        case 'left':
            // Left players start at leftStartRow and each takes 3 rows (name, role, spacing)
            return leftStartRow + (player.sideIndex * 3);
        case 'right':
            // Right players start at rightStartRow and each takes 3 rows
            return roleRow + 2 + (player.sideIndex * 3);
        default:
            return nameRow;
    }
}

/**
 * Gets the column position for a player based on their side and position in justified layout
 */
function getPlayerColumn(player: PlayerPosition, positions: any): number {
    switch (player.side) {
        case 'top':
            return positions.top[player.sideIndex];
        case 'bottom':  
            return positions.bottom[player.sideIndex];
        case 'left': {
            // Calculate V-shaped positioning for left side
            const leftBaseCol = 1;
            const leftMaxIndent = Math.min(8, Math.floor(positions.leftPlayerCount * 1.5));
            const leftColumns = calculateVShapedColumns(positions.leftPlayerCount, leftBaseCol, leftMaxIndent, true);
            return leftColumns[player.sideIndex];
        }
        case 'right': {
            // Calculate V-shaped positioning for right side
            // Need to reproduce the same logic as in createAbstractGrid
            const maxTopCol = positions.maxTopCol || 40; // fallback value
            const maxLeftWidth = positions.maxLeftWidth || 10; // fallback value
            const rightMaxIndent = Math.min(8, Math.floor(positions.rightPlayerCount * 1.5));
            const minRightStartCol = Math.max(maxTopCol + 2, 1 + maxLeftWidth + 3);
            const rightStartCol = minRightStartCol + rightMaxIndent;
            const rightBaseCol = rightStartCol;
            const safeRightMaxIndent = Math.max(1, rightMaxIndent); // Avoid division by zero
            const rightColumns = calculateVShapedColumns(positions.rightPlayerCount, rightBaseCol, safeRightMaxIndent, false);
            return rightColumns[player.sideIndex];
        }
        default:
            return 0;
    }
}

function createAbstractGrid(playerPositions: PlayerPosition[], coordinateOptions: RenderOptions, textOptions?: RenderOptions): AbstractGrid {
    const cells: GridCell[] = [];
    
    // Get players by side
    const topPlayers = playerPositions.filter(p => p.side === 'top');
    const rightPlayers = playerPositions.filter(p => p.side === 'right');
    const bottomPlayers = playerPositions.filter(p => p.side === 'bottom');
    const leftPlayers = playerPositions.filter(p => p.side === 'left');
    
    // Calculate justified positions for each side using coordinate options (worst-case formatting)
    const justifiedPositions = calculateJustifiedPositions(topPlayers, rightPlayers, bottomPlayers, leftPlayers, coordinateOptions);
    
    // Use text options for actual content generation (actual formatting)
    const actualTextOptions = textOptions || coordinateOptions;
    
    // Calculate how many token rows we need above the top players
    // Find the maximum number of tokens across ALL players to determine bubble height
    const allTokenCounts = topPlayers.map(p => p.player.tokens.length);
    const maxTokensInAnyColumn = Math.max(0, ...allTokenCounts);
    const hasTokens = maxTokensInAnyColumn > 0;
    
    
    let tokenStartRow, tokenRows, columnNumberRow;
    if (hasTokens) {
        tokenStartRow = 2; // Start after blank line 
        tokenRows = 6; // Fixed height for the bubble matrix
        columnNumberRow = tokenStartRow + tokenRows;
        
        // Add explicit blank line at row 1
        cells.push({ content: '', row: 1, col: 0 });
    } else {
        tokenStartRow = 1;
        tokenRows = 0;
        columnNumberRow = tokenStartRow;
    }
    
    const nameRow = columnNumberRow + 1;
    const roleRow = nameRow + 1;
    
    // Place top players with justified spacing - names and roles first
    for (let i = 0; i < topPlayers.length; i++) {
        const pos = topPlayers[i];
        const currentCol = justifiedPositions.top[i];
        const { name, role } = formatPlayerDisplayText(pos.player, actualTextOptions);
        
        // Place column number
        if (actualTextOptions.showColumnNumbers) {
            cells.push({ content: `(${currentCol})`, row: columnNumberRow, col: currentCol });
        }
        
        // Place name and role
        cells.push({ content: name, row: nameRow, col: currentCol });
        cells.push({ content: role, row: roleRow, col: currentCol });
    }
    
    // Calculate dimensions for V-shaped positioning (needed for both tokens and layout)
    const maxTopCol = topPlayers.length > 0 ? 
        Math.max(...topPlayers.map((pos, i) => {
            const currentCol = justifiedPositions.top[i];
            const structured = formatPlayerStructured(pos.player, coordinateOptions);
            const contentEnd = currentCol + structured.name.leftDeco.length + structured.name.content.length;
            const roleContentEnd = currentCol + structured.role.leftDeco.length + structured.role.content.length;
            return Math.max(contentEnd, roleContentEnd);
        })) : 4;
    
    const maxLeftWidth = leftPlayers.length > 0 ? 
        Math.max(...leftPlayers.map(pos => getPlayerDisplayWidth(pos.player, coordinateOptions.useAbbreviations ?? true, coordinateOptions))) : 0;

    // Store bubble line data for later processing (after bottom player positioning)
    let bubbleLineData: { topSet: PlayerPosition[]; bottomSet: PlayerPosition[]; enhancedPositions: any; } | null = null;
    
    if (hasTokens) {
        // Group players into top-set and bottom-set as specified by user
        const { topSet, bottomSet } = groupPlayersIntoSets(topPlayers, rightPlayers, bottomPlayers, leftPlayers);
        
        // Enhanced positions object with V-shaped calculation context
        const enhancedPositions = {
            ...justifiedPositions,
            leftPlayerCount: leftPlayers.length,
            rightPlayerCount: rightPlayers.length,
            maxTopCol,
            maxLeftWidth
        };
        
        // Store for processing after bottom players are positioned
        bubbleLineData = { topSet, bottomSet, enhancedPositions };
    }
    
    // Calculate dimensions based on placed top players and potential left side content
    // Use content-based positioning: right-side players should start after top players' content ends
    // (maxTopCol and maxLeftWidth already calculated above for token bubble lines)
    
    // Calculate V-shaped indentation for right side first to account for overlap
    const rightMaxIndent = Math.min(8, Math.floor(rightPlayers.length * 1.5)); // Progressive indentation
    
    // Calculate rightStartCol accounting for the maximum left indentation of right players
    // The most indented right player will be at rightStartCol - rightMaxIndent
    // This needs to be far enough right to avoid overlap with left/top/bottom players
    const minRightStartCol = Math.max(maxTopCol + 2, 1 + maxLeftWidth + 3); // leftCol is 1
    const rightStartCol = minRightStartCol + rightMaxIndent; // Add buffer for maximum indentation
    
    // Place right players using V-shaped positioning (inverted-V pattern)
    const rightStartRow = roleRow + 2; // Start below top players with spacing
    
    // Calculate V-shaped column positions for right side
    const rightBaseCol = rightStartCol; // Right edge position (content starts here)
    
    // Ensure V-shaped positioning doesn't create negative columns
    // The furthest indented position should be at least at column 1 (inside border)
    const safeRightMaxIndent = Math.min(rightMaxIndent, rightBaseCol - 1);
    const rightColumns = calculateVShapedColumns(rightPlayers.length, rightBaseCol, safeRightMaxIndent, false);
    
    let currentRightRow = rightStartRow;
    
    for (let i = 0; i < rightPlayers.length; i++) {
        const pos = rightPlayers[i];
        const rightCol = rightColumns[i];
        const structured = formatPlayerStructured(pos.player, actualTextOptions);
        
        // Calculate where to place the full string so that content starts at rightCol
        // Ensure we never place text at negative column positions
        const nameStartCol = Math.max(0, rightCol - structured.name.leftDeco.length);
        const roleStartCol = Math.max(0, rightCol - structured.role.leftDeco.length);
        
        cells.push({ content: structured.name.full, row: currentRightRow, col: nameStartCol });
        cells.push({ content: structured.role.full, row: currentRightRow + 1, col: roleStartCol });
        
        if (actualTextOptions.showColumnNumbers) {
            cells.push({ content: `(${rightCol})`, row: currentRightRow + 2, col: rightCol });
        }
        
        // Token rendering now handled by bubble line system above
        
        currentRightRow += 3; // Account for name, role, and space to next player
    }
    
    // Place bottom players with justified spacing
    // Ensure bottom players are positioned below left players to avoid row conflicts
    const leftPlayersNeeded = leftPlayers.length * 3; // Each left player needs 3 rows (name, role, spacing)
    const leftEndRow = roleRow + 3 + leftPlayersNeeded; // Where left players will end
    const bottomRow = rightPlayers.length > 0 ? 
        Math.max(currentRightRow, leftEndRow + 1) : 
        Math.max(currentRightRow, leftEndRow + 1, 8);
    for (let i = 0; i < bottomPlayers.length; i++) {
        const pos = bottomPlayers[i];
        const { name, role } = formatPlayerDisplayText(pos.player, actualTextOptions);
        const currentCol = justifiedPositions.bottom[i];
        
        // DEBUG removed - use explicit-turns mode for targeted debugging
        
        cells.push({ content: name, row: bottomRow, col: currentCol });
        cells.push({ content: role, row: bottomRow + 1, col: currentCol });
        
        if (actualTextOptions.showColumnNumbers) {
            cells.push({ content: `(${currentCol})`, row: bottomRow + 2, col: currentCol });
        }
        
        // Token rendering now handled by bubble line system above
    }
    
    // Place left players using V-shaped positioning (inverted-V pattern)
    // Middle player closest to left edge, top/bottom players indented inward
    const leftStartRow = roleRow + 3; // Start below top players with spacing
    
    // Calculate V-shaped column positions for left side
    const leftBaseCol = 1; // Left edge position (inside border)
    const leftMaxIndent = Math.min(8, Math.floor(leftPlayers.length * 1.5)); // Progressive indentation
    const leftColumns = calculateVShapedColumns(leftPlayers.length, leftBaseCol, leftMaxIndent, true);
    
    let currentLeftRow = leftStartRow;
    
    for (let i = 0; i < leftPlayers.length; i++) {
        const pos = leftPlayers[i];
        const leftCol = leftColumns[i];
        const { name, role } = formatPlayerDisplayText(pos.player, actualTextOptions);
        
        cells.push({ content: name, row: currentLeftRow, col: leftCol });
        cells.push({ content: role, row: currentLeftRow + 1, col: leftCol });
        
        if (actualTextOptions.showColumnNumbers) {
            cells.push({ content: `(${leftCol})`, row: currentLeftRow + 2, col: leftCol });
        }
        
        // Token rendering now handled by bubble line system above
        
        currentLeftRow += 3; // Account for name, role, and space to next player
    }
    
    // Process token bubble lines after all players are positioned
    if (bubbleLineData) {
        const { topSet, bottomSet, enhancedPositions } = bubbleLineData;
        
        // Now we have access to the actual bottomRow that was calculated above
        const actualBottomRow = bottomPlayers.length > 0 ? bottomRow : 0;
        
        // Create token bubble lines using right-to-left scanning
        const bubbleLines = createTokenBubbleLines(topSet, bottomSet, enhancedPositions, tokenStartRow, tokenRows, actualBottomRow, nameRow, roleRow, leftStartRow, actualTextOptions);
        
        // Add bubble line cells to the main cell array
        cells.push(...bubbleLines);
    }
    
    // Calculate grid bounds using worst-case text widths for stable layout dimensions
    const minRow = cells.length > 0 ? Math.min(...cells.map(c => c.row)) : 0;
    const maxRow = cells.length > 0 ? Math.max(...cells.map(c => c.row)) : 0;
    const minCol = cells.length > 0 ? Math.min(...cells.map(c => c.col)) : 0;
    
    // Calculate maxCol based on actual content (stability handled at higher level)
    const maxCol = cells.length > 0 ? Math.max(...cells.map(c => c.col + c.content.length - 1)) : 0;
    
    
    return { cells, minRow, maxRow, minCol, maxCol };
}

// Legacy spacing function - replaced by hybrid dense/justified algorithm
// Kept for potential future use in other layout modes

/**
 * Validates column structure by scanning the rendered output column by column.
 * Legal column patterns: spaces, then optionally one uppercase player name, content,
 * optionally one more uppercase player name (if upper/lower side sharing), then whitespace.
 */
export function validateColumnStructure(renderedOutput: string, options?: RenderOptions & { _isEvaluation?: boolean }): void {
    // Skip validation during evaluation mode to avoid performance overhead
    if (options?._isEvaluation) {
        return;
    }
    
    const lines = renderedOutput.split('\n');
    if (lines.length <= 2) { // Need at least top border, content, bottom border
        return;
    }
    
    // Ignore decorative borders: skip first and last row, first and last column
    const contentLines = lines.slice(1, -1); // Remove top and bottom border lines
    const maxWidth = Math.max(...lines.map(line => line.length));
    const problemColumns: string[] = [];
    
    // Scan each column, ignoring the border columns (first and last)
    for (let col = 1; col < maxWidth - 1; col++) {
        // Extract the column as a vertical string from content area only
        const columnChars: string[] = [];
        for (let row = 0; row < contentLines.length; row++) {
            const char = col < contentLines[row].length ? contentLines[row][col] : ' ';
            columnChars.push(char);
        }
        const columnStr = columnChars.join('');
        
        // Skip columns that are entirely whitespace or contain only decorative elements
        if (/^[ │┌┐└┘─┤├┬┴┼]*$/.test(columnStr)) {
            continue;
        }
        
        // Count uppercase letters (player names)
        const uppercaseMatches = columnStr.match(/[A-Z]/g) || [];
        const uppercaseCount = uppercaseMatches.length;
        
        // Rule: At most 2 players per column
        if (uppercaseCount > 2) {
            problemColumns.push(`Column ${col}: ${uppercaseCount} player names (max 2 allowed)`);
            continue;
        }
        
        // If no players in this column, skip further validation
        if (uppercaseCount === 0) {
            continue;
        }
        
        // Find player positions
        const playerPositions: number[] = [];
        for (let i = 0; i < columnStr.length; i++) {
            if (/[A-Z]/.test(columnStr[i])) {
                playerPositions.push(i);
            }
        }
        
        // Rules for 1 player: must have clear line either up or down
        if (uppercaseCount === 1) {
            const playerPos = playerPositions[0];
            // Clear line means: only spaces and lowercase letters (role names, tokens), no other uppercase
            const hasSpaceAbove = playerPos === 0 || /^[ a-z():*~_-]*$/.test(columnStr.substring(0, playerPos));
            const hasSpaceBelow = playerPos === columnStr.length - 1 || /^[ a-z():*~_-]*$/.test(columnStr.substring(playerPos + 1));
            
            if (!hasSpaceAbove && !hasSpaceBelow) {
                problemColumns.push(`Column ${col}: Single player has no clear line up or down`);
            }
        }
        
        // Rules for 2 players: top must have clear line up, bottom must have clear line down
        if (uppercaseCount === 2) {
            const topPlayerPos = Math.min(...playerPositions);
            const bottomPlayerPos = Math.max(...playerPositions);
            
            // Clear line means: only spaces and lowercase letters, no other uppercase letters
            const topHasSpaceAbove = topPlayerPos === 0 || /^[ a-z():*~_-]*$/.test(columnStr.substring(0, topPlayerPos));
            const bottomHasSpaceBelow = bottomPlayerPos === columnStr.length - 1 || /^[ a-z():*~_-]*$/.test(columnStr.substring(bottomPlayerPos + 1));
            
            if (!topHasSpaceAbove) {
                problemColumns.push(`Column ${col}: Top player has no clear line up`);
            }
            if (!bottomHasSpaceBelow) {
                problemColumns.push(`Column ${col}: Bottom player has no clear line down`);
            }
        }
    }
    
    if (problemColumns.length > 0) {
        console.warn(
            `⚠️  COLUMN VALIDATION WARNING: Invalid column structure detected!\n` +
            `Rules: 1) max 2 players per column, 2) single player needs clear line up OR down, 3) two players need clear lines up (top) and down (bottom)\n` +
            `Problem columns:\n${problemColumns.map(line => `  ${line}`).join('\n')}`
        );
    } else if (process.env.NODE_ENV !== 'production') {
        console.debug(`✅ Column structure validation passed`);
    }
}


function renderAbstractGrid(grid: AbstractGrid, playerCount: number, options?: RenderOptions & { _isEvaluation?: boolean }): string {
    // Create a 2D array to hold the final output
    const height = grid.maxRow - grid.minRow + 3; // Add padding for border
    const width = grid.maxCol - grid.minCol + 4;  // Content width + 2 borders + 1 right padding
    
    const lines: string[] = [];
    for (let i = 0; i < height; i++) {
        lines.push(' '.repeat(width));
    }
    
    // Place all grid cells with padding
    for (const cell of grid.cells) {
        const row = cell.row - grid.minRow + 1; // Adjust for border
        const col = cell.col - grid.minCol + 1; // Adjust for border only
        setTextInLines(lines, row, col, cell.content);
    }
    

    // Add border with configurable title during evaluation
    let title: string;
    if (options?._isEvaluation) {
        // Use configurable evaluation title or default to original
        title = (options as any)._evaluationTitle || `─ Grimoire (${playerCount} players) `;
    } else {
        // For final rendering, choose adaptive title based on content width
        const fullTitle = `─ Grimoire (${playerCount} players) `;
        const shortTitle = `─ Grim `;
        const borderWidth = width - 2;
        title = fullTitle.length <= borderWidth ? fullTitle : shortTitle;
    }
    const borderWidth = width - 2;
    const borderTop = '┌' + title + '─'.repeat(Math.max(0, borderWidth - title.length)) + '┐';
    const borderBottom = '└' + '─'.repeat(borderWidth) + '┘';
    
    lines[0] = borderTop;
    lines[height - 1] = borderBottom;
    
    // Add side borders
    for (let i = 1; i < height - 1; i++) {
        lines[i] = '│' + lines[i].substring(1, width - 1) + '│';
    }
    
    const result = lines.join('\n');
    
    // Validate column structure using new regex-based approach
    validateColumnStructure(result, options);
    
    return result;
}

function setTextInLines(lines: string[], row: number, col: number, text: string): void {
    if (row < 0 || row >= lines.length || col < 0) return;
    
    let line = lines[row];
    
    // DEBUG: Check for potential text overlaps (removed after testing)
    
    // Extend line if needed
    if (line.length < col + text.length) {
        line = line + ' '.repeat(col + text.length - line.length);
    }
    
    // Split line and insert text
    const before = line.substring(0, col);
    const after = line.substring(col + text.length);
    
    lines[row] = before + text + after;
    
    // DEBUG: Show result for problematic text (removed after testing)
}

function findBestTurnConfiguration(players: any[], options: RenderOptions): TurnBasedLayout {
    const playerCount = players.length;
    const allTurnConfigs = generateAllTurnConfigurations(playerCount);
    
    // Debug: Check if we're using a custom evaluation title
    const evaluationTitle = (options as any)._evaluationTitle;
    const isInstrumented = evaluationTitle && (evaluationTitle.includes('Grim') || evaluationTitle.includes('long title'));
    
    if (isInstrumented) {
        console.log(`\n=== FINDBESTTURN DEBUG: title="${evaluationTitle}" ===`);
        console.log(`Generated ${allTurnConfigs.length} configurations for ${playerCount} players`);
    }
    
    // Evaluate each configuration by rendering and measuring dimensions
    let bestConfig = allTurnConfigs[0];
    let bestScore = Number.POSITIVE_INFINITY;
    let evaluationResults: Array<{config: TurnBasedLayout, score: number, success: boolean, error?: string}> = [];
    
    for (const config of allTurnConfigs) {
        try {
            const score = evaluateLayoutSquareness(players, config, options);
            evaluationResults.push({config, score, success: true});
            
            if (score < bestScore) {
                bestScore = score;
                bestConfig = config;
            }
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] score: ${score.toFixed(3)} ${score === bestScore ? '← NEW BEST' : ''}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            evaluationResults.push({config, score: Number.POSITIVE_INFINITY, success: false, error: errorMessage});
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] FAILED: ${errorMessage}`);
            }
        }
    }
    
    if (isInstrumented) {
        const successfulEvals = evaluationResults.filter(r => r.success);
        const failedEvals = evaluationResults.filter(r => !r.success);
        
        console.log(`\nSUMMARY:`);
        console.log(`  Total configurations: ${allTurnConfigs.length}`);
        console.log(`  Successful evaluations: ${successfulEvals.length}`);
        console.log(`  Failed evaluations: ${failedEvals.length}`);
        console.log(`  Selected best: [${bestConfig.topCount},${bestConfig.rightCount},${bestConfig.bottomCount},${bestConfig.leftCount}] score: ${bestScore.toFixed(3)}`);
        
        // Check if we missed any obviously good configurations
        const sortedByScore = successfulEvals.sort((a, b) => a.score - b.score);
        console.log(`  Top 3 scores:`);
        for (let i = 0; i < Math.min(3, sortedByScore.length); i++) {
            const result = sortedByScore[i];
            console.log(`    ${i+1}. [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}] score: ${result.score.toFixed(3)}`);
        }
        
        if (failedEvals.length > 0) {
            console.log(`  Failed configurations:`);
            failedEvals.forEach(result => {
                console.log(`    [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}]: ${result.error}`);
            });
        }
        console.log(`=== END FINDBESTTURN DEBUG ===\n`);
    }
    
    // Debug: uncomment to see final choice
    // console.log(`Best: [${bestConfig.topCount},${bestConfig.rightCount},${bestConfig.bottomCount},${bestConfig.leftCount}] score: ${bestScore.toFixed(3)}`);
    
    return bestConfig;
}

function findBestTurnConfigurationByArea(players: any[], options: RenderOptions): TurnBasedLayout {
    const playerCount = players.length;
    const allTurnConfigs = generateAllTurnConfigurations(playerCount);
    
    // Debug: Check if we're using a custom evaluation title
    const evaluationTitle = (options as any)._evaluationTitle;
    const isInstrumented = evaluationTitle && (evaluationTitle.includes('Grim') || evaluationTitle.includes('long title'));
    
    if (isInstrumented) {
        console.log(`\n=== FINDBESTAREA DEBUG: title="${evaluationTitle}" ===`);
        console.log(`Generated ${allTurnConfigs.length} configurations for ${playerCount} players`);
    }
    
    // Evaluate each configuration by rendering and measuring total area
    let bestConfig = allTurnConfigs[0];
    let bestArea = Number.POSITIVE_INFINITY;
    let evaluationResults: Array<{config: TurnBasedLayout, area: number, success: boolean, error?: string}> = [];
    
    for (const config of allTurnConfigs) {
        try {
            const area = evaluateLayoutArea(players, config, options);
            evaluationResults.push({config, area, success: true});
            
            if (area < bestArea) {
                bestArea = area;
                bestConfig = config;
            }
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] area: ${area} ${area === bestArea ? '← NEW BEST' : ''}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            evaluationResults.push({config, area: Number.POSITIVE_INFINITY, success: false, error: errorMessage});
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] FAILED: ${errorMessage}`);
            }
        }
    }
    
    if (isInstrumented) {
        const successfulEvals = evaluationResults.filter(r => r.success);
        const failedEvals = evaluationResults.filter(r => !r.success);
        
        console.log(`\nSUMMARY:`);
        console.log(`  Total configurations: ${allTurnConfigs.length}`);
        console.log(`  Successful evaluations: ${successfulEvals.length}`);
        console.log(`  Failed evaluations: ${failedEvals.length}`);
        console.log(`  Selected best: [${bestConfig.topCount},${bestConfig.rightCount},${bestConfig.bottomCount},${bestConfig.leftCount}] area: ${bestArea}`);
        
        // Check if we missed any obviously good configurations
        const sortedByArea = successfulEvals.sort((a, b) => a.area - b.area);
        console.log(`  Top 3 areas:`);
        for (let i = 0; i < Math.min(3, sortedByArea.length); i++) {
            const result = sortedByArea[i];
            console.log(`    ${i+1}. [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}] area: ${result.area}`);
        }
        
        if (failedEvals.length > 0) {
            console.log(`  Failed configurations:`);
            failedEvals.forEach(result => {
                console.log(`    [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}]: ${result.error}`);
            });
        }
        console.log(`=== END FINDBESTAREA DEBUG ===\n`);
    }
    
    return bestConfig;
}

function findBestTurnConfigurationByMaxDim(players: any[], options: RenderOptions): TurnBasedLayout {
    const playerCount = players.length;
    const allTurnConfigs = generateAllTurnConfigurations(playerCount);
    
    // Debug: Check if we're using a custom evaluation title
    const evaluationTitle = (options as any)._evaluationTitle;
    const isInstrumented = evaluationTitle && (evaluationTitle.includes('Grim') || evaluationTitle.includes('long title'));
    
    if (isInstrumented) {
        console.log(`\n=== FINDBESTMAXDIM DEBUG: title="${evaluationTitle}" ===`);
        console.log(`Generated ${allTurnConfigs.length} configurations for ${playerCount} players`);
    }
    
    // Evaluate each configuration by rendering and measuring maximum dimension
    let bestConfig = allTurnConfigs[0];
    let bestMaxDim = Number.POSITIVE_INFINITY;
    let evaluationResults: Array<{config: TurnBasedLayout, maxDim: number, success: boolean, error?: string}> = [];
    
    for (const config of allTurnConfigs) {
        try {
            const maxDim = evaluateLayoutMaxDimension(players, config, options);
            evaluationResults.push({config, maxDim, success: true});
            
            if (maxDim < bestMaxDim) {
                bestMaxDim = maxDim;
                bestConfig = config;
            }
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] maxDim: ${maxDim} ${maxDim === bestMaxDim ? '← NEW BEST' : ''}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            evaluationResults.push({config, maxDim: Number.POSITIVE_INFINITY, success: false, error: errorMessage});
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] FAILED: ${errorMessage}`);
            }
        }
    }
    
    if (isInstrumented) {
        const successfulEvals = evaluationResults.filter(r => r.success);
        const failedEvals = evaluationResults.filter(r => !r.success);
        
        console.log(`\nSUMMARY:`);
        console.log(`  Total configurations: ${allTurnConfigs.length}`);
        console.log(`  Successful evaluations: ${successfulEvals.length}`);
        console.log(`  Failed evaluations: ${failedEvals.length}`);
        console.log(`  Selected best: [${bestConfig.topCount},${bestConfig.rightCount},${bestConfig.bottomCount},${bestConfig.leftCount}] maxDim: ${bestMaxDim}`);
        
        // Check if we missed any obviously good configurations
        const sortedByMaxDim = successfulEvals.sort((a, b) => a.maxDim - b.maxDim);
        console.log(`  Top 3 maxDims:`);
        for (let i = 0; i < Math.min(3, sortedByMaxDim.length); i++) {
            const result = sortedByMaxDim[i];
            console.log(`    ${i+1}. [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}] maxDim: ${result.maxDim}`);
        }
        
        if (failedEvals.length > 0) {
            console.log(`  Failed configurations:`);
            failedEvals.forEach(result => {
                console.log(`    [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}]: ${result.error}`);
            });
        }
        console.log(`=== END FINDBESTMAXDIM DEBUG ===\n`);
    }
    
    return bestConfig;
}

function findBestTurnConfigurationByPerimeter(players: any[], options: RenderOptions): TurnBasedLayout {
    const playerCount = players.length;
    const allTurnConfigs = generateAllTurnConfigurations(playerCount);
    
    // Debug: Check if we're using a custom evaluation title
    const evaluationTitle = (options as any)._evaluationTitle;
    const isInstrumented = evaluationTitle && (evaluationTitle.includes('Grim') || evaluationTitle.includes('long title'));
    
    if (isInstrumented) {
        console.log(`\n=== FINDBESTPERIMETER DEBUG: title="${evaluationTitle}" ===`);
        console.log(`Generated ${allTurnConfigs.length} configurations for ${playerCount} players`);
    }
    
    // Evaluate each configuration by rendering and measuring perimeter (width + height)
    let bestConfig = allTurnConfigs[0];
    let bestPerimeter = Number.POSITIVE_INFINITY;
    let evaluationResults: Array<{config: TurnBasedLayout, perimeter: number, success: boolean, error?: string}> = [];
    
    for (const config of allTurnConfigs) {
        try {
            const perimeter = evaluateLayoutPerimeter(players, config, options);
            evaluationResults.push({config, perimeter, success: true});
            
            if (perimeter < bestPerimeter) {
                bestPerimeter = perimeter;
                bestConfig = config;
            }
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] perimeter: ${perimeter} ${perimeter === bestPerimeter ? '← NEW BEST' : ''}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            evaluationResults.push({config, perimeter: Number.POSITIVE_INFINITY, success: false, error: errorMessage});
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] FAILED: ${errorMessage}`);
            }
        }
    }
    
    if (isInstrumented) {
        const successfulEvals = evaluationResults.filter(r => r.success);
        const failedEvals = evaluationResults.filter(r => !r.success);
        
        console.log(`\nSUMMARY:`);
        console.log(`  Total configurations: ${allTurnConfigs.length}`);
        console.log(`  Successful evaluations: ${successfulEvals.length}`);
        console.log(`  Failed evaluations: ${failedEvals.length}`);
        console.log(`  Selected best: [${bestConfig.topCount},${bestConfig.rightCount},${bestConfig.bottomCount},${bestConfig.leftCount}] perimeter: ${bestPerimeter}`);
        
        // Check if we missed any obviously good configurations
        const sortedByPerimeter = successfulEvals.sort((a, b) => a.perimeter - b.perimeter);
        console.log(`  Top 3 perimeters:`);
        for (let i = 0; i < Math.min(3, sortedByPerimeter.length); i++) {
            const result = sortedByPerimeter[i];
            console.log(`    ${i+1}. [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}] perimeter: ${result.perimeter}`);
        }
        
        if (failedEvals.length > 0) {
            console.log(`  Failed configurations:`);
            failedEvals.forEach(result => {
                console.log(`    [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}]: ${result.error}`);
            });
        }
        console.log(`=== END FINDBESTPERIMETER DEBUG ===\n`);
    }
    
    return bestConfig;
}

function findBestTurnConfigurationByAreaPerimeterRatio(players: any[], options: RenderOptions): TurnBasedLayout {
    const playerCount = players.length;
    const allTurnConfigs = generateAllTurnConfigurations(playerCount);
    
    // Debug: Check if we're using a custom evaluation title
    const evaluationTitle = (options as any)._evaluationTitle;
    const isInstrumented = evaluationTitle && (evaluationTitle.includes('Grim') || evaluationTitle.includes('long title'));
    
    if (isInstrumented) {
        console.log(`\n=== FINDBESTAREARATIO DEBUG: title="${evaluationTitle}" ===`);
        console.log(`Generated ${allTurnConfigs.length} configurations for ${playerCount} players`);
    }
    
    // Evaluate each configuration by rendering and measuring area-to-perimeter ratio
    let bestConfig = allTurnConfigs[0];
    let bestRatio = 0; // Higher ratio is better (more efficient)
    let evaluationResults: Array<{config: TurnBasedLayout, ratio: number, success: boolean, error?: string}> = [];
    
    for (const config of allTurnConfigs) {
        try {
            const ratio = evaluateLayoutAreaPerimeterRatio(players, config, options);
            evaluationResults.push({config, ratio, success: true});
            
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestConfig = config;
            }
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] ratio: ${ratio.toFixed(3)} ${ratio === bestRatio ? '← NEW BEST' : ''}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            evaluationResults.push({config, ratio: 0, success: false, error: errorMessage});
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] FAILED: ${errorMessage}`);
            }
        }
    }
    
    if (isInstrumented) {
        const successfulEvals = evaluationResults.filter(r => r.success);
        const failedEvals = evaluationResults.filter(r => !r.success);
        
        console.log(`\nSUMMARY:`);
        console.log(`  Total configurations: ${allTurnConfigs.length}`);
        console.log(`  Successful evaluations: ${successfulEvals.length}`);
        console.log(`  Failed evaluations: ${failedEvals.length}`);
        console.log(`  Selected best: [${bestConfig.topCount},${bestConfig.rightCount},${bestConfig.bottomCount},${bestConfig.leftCount}] ratio: ${bestRatio.toFixed(3)}`);
        
        // Check if we missed any obviously good configurations
        const sortedByRatio = successfulEvals.sort((a, b) => b.ratio - a.ratio); // Descending order (higher is better)
        console.log(`  Top 3 ratios:`);
        for (let i = 0; i < Math.min(3, sortedByRatio.length); i++) {
            const result = sortedByRatio[i];
            console.log(`    ${i+1}. [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}] ratio: ${result.ratio.toFixed(3)}`);
        }
        
        if (failedEvals.length > 0) {
            console.log(`  Failed configurations:`);
            failedEvals.forEach(result => {
                console.log(`    [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}]: ${result.error}`);
            });
        }
        console.log(`=== END FINDBESTAREARATIO DEBUG ===\n`);
    }
    
    return bestConfig;
}

function findBestTurnConfigurationByAreaPerimeter2Ratio(players: any[], options: RenderOptions): TurnBasedLayout {
    const playerCount = players.length;
    const allTurnConfigs = generateAllTurnConfigurations(playerCount);
    
    // Debug: Check if we're using a custom evaluation title
    const evaluationTitle = (options as any)._evaluationTitle;
    const isInstrumented = evaluationTitle && (evaluationTitle.includes('Grim') || evaluationTitle.includes('long title'));
    
    if (isInstrumented) {
        console.log(`\n=== FINDBESTAREA2RATIO DEBUG: title="${evaluationTitle}" ===`);
        console.log(`Generated ${allTurnConfigs.length} configurations for ${playerCount} players`);
    }
    
    // Evaluate each configuration by rendering and measuring area-to-perimeter-squared ratio
    let bestConfig = allTurnConfigs[0];
    let bestRatio = 0; // Higher ratio is better (more efficient)
    let evaluationResults: Array<{config: TurnBasedLayout, ratio: number, success: boolean, error?: string}> = [];
    
    for (const config of allTurnConfigs) {
        try {
            const ratio = evaluateLayoutAreaPerimeter2Ratio(players, config, options);
            evaluationResults.push({config, ratio, success: true});
            
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestConfig = config;
            }
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] ratio: ${ratio.toFixed(3)} ${ratio === bestRatio ? '← NEW BEST' : ''}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            evaluationResults.push({config, ratio: 0, success: false, error: errorMessage});
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] FAILED: ${errorMessage}`);
            }
        }
    }
    
    if (isInstrumented) {
        const successfulEvals = evaluationResults.filter(r => r.success);
        const failedEvals = evaluationResults.filter(r => !r.success);
        
        console.log(`\nSUMMARY:`);
        console.log(`  Total configurations: ${allTurnConfigs.length}`);
        console.log(`  Successful evaluations: ${successfulEvals.length}`);
        console.log(`  Failed evaluations: ${failedEvals.length}`);
        console.log(`  Selected best: [${bestConfig.topCount},${bestConfig.rightCount},${bestConfig.bottomCount},${bestConfig.leftCount}] ratio: ${bestRatio.toFixed(3)}`);
        
        // Check if we missed any obviously good configurations
        const sortedByRatio = successfulEvals.sort((a, b) => b.ratio - a.ratio); // Descending order (higher is better)
        console.log(`  Top 3 ratios:`);
        for (let i = 0; i < Math.min(3, sortedByRatio.length); i++) {
            const result = sortedByRatio[i];
            console.log(`    ${i+1}. [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}] ratio: ${result.ratio.toFixed(3)}`);
        }
        
        if (failedEvals.length > 0) {
            console.log(`  Failed configurations:`);
            failedEvals.forEach(result => {
                console.log(`    [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}]: ${result.error}`);
            });
        }
        console.log(`=== END FINDBESTAREA2RATIO DEBUG ===\n`);
    }
    
    return bestConfig;
}


function findBestTurnConfigurationByWidthConstraint(players: any[], options: RenderOptions): TurnBasedLayout {
    const playerCount = players.length;
    const allTurnConfigs = generateAllTurnConfigurations(playerCount);
    const targetWidth = options.targetWidth!;
    
    // Debug: Check if we're using a custom evaluation title
    const evaluationTitle = (options as any)._evaluationTitle;
    const isInstrumented = evaluationTitle && (evaluationTitle.includes('Grim') || evaluationTitle.includes('long title'));
    
    if (isInstrumented) {
        console.log(`\n=== FINDBESTWIDTH-CONSTRAINED DEBUG: title="${evaluationTitle}" ===`);
        console.log(`Generated ${allTurnConfigs.length} configurations for ${playerCount} players`);
        console.log(`Target width constraint: ${targetWidth} characters`);
    }
    
    // Evaluate each configuration and find the one that maximizes width usage without exceeding target
    let bestConfig = allTurnConfigs[0];
    let bestWidth = 0; // We want to maximize width usage within constraint
    let bestHeight = Number.POSITIVE_INFINITY; // Secondary: minimize height
    let bestTopCount = 0; // Tertiary: maximize top-side players
    let fallbackConfig = allTurnConfigs[0];
    let fallbackWidth = Number.POSITIVE_INFINITY; // Track narrowest layout as fallback
    let evaluationResults: any[] = [];
    
    for (const config of allTurnConfigs) {
        try {
            const width = evaluateLayoutWidth(players, config, options);
            const height = evaluateLayoutHeight(players, config, options);
            const withinConstraint = width <= targetWidth;
            
            evaluationResults.push({ config, width, height, withinConstraint, success: true });
            
            // Track the narrowest layout as fallback (in case nothing fits)
            if (width < fallbackWidth) {
                fallbackWidth = width;
                fallbackConfig = config;
            }
            
            // Only consider configurations that fit within the constraint for best choice
            if (withinConstraint) {
                let isBetter = false;
                
                if (width > bestWidth) {
                    // Primary criterion: maximize width
                    isBetter = true;
                } else if (width === bestWidth) {
                    if (height < bestHeight) {
                        // Secondary criterion: minimize height (when widths are equal)
                        isBetter = true;
                    } else if (height === bestHeight) {
                        if (config.topCount > bestTopCount) {
                            // Tertiary criterion: maximize top-side players (when width and height are equal)
                            isBetter = true;
                        }
                    }
                }
                
                if (isBetter) {
                    bestWidth = width;
                    bestHeight = height;
                    bestTopCount = config.topCount;
                    bestConfig = config;
                }
            }
            
            if (isInstrumented) {
                const status = withinConstraint ? (width === bestWidth ? '← NEW BEST' : '✓') : '✗ TOO WIDE';
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] width: ${width} ${status}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            evaluationResults.push({ config, width: Number.POSITIVE_INFINITY, withinConstraint: false, success: false, error: errorMessage });
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] FAILED: ${errorMessage}`);
            }
        }
    }
    
    if (isInstrumented) {
        const successfulEvals = evaluationResults.filter(r => r.success);
        const validEvals = successfulEvals.filter(r => r.withinConstraint);
        const tooWideEvals = successfulEvals.filter(r => !r.withinConstraint);
        const failedEvals = evaluationResults.filter(r => !r.success);
        
        console.log(`\nSUMMARY:`);
        console.log(`  Total configurations: ${allTurnConfigs.length}`);
        console.log(`  Successful evaluations: ${successfulEvals.length}`);
        console.log(`  Within width constraint: ${validEvals.length}`);
        console.log(`  Too wide (exceeds ${targetWidth}): ${tooWideEvals.length}`);
        console.log(`  Failed evaluations: ${failedEvals.length}`);
        const finalConfig = validEvals.length > 0 ? bestConfig : fallbackConfig;
        const finalWidth = validEvals.length > 0 ? bestWidth : fallbackWidth;
        const fallbackUsed = validEvals.length === 0;
        
        console.log(`  Selected best: [${finalConfig.topCount},${finalConfig.rightCount},${finalConfig.bottomCount},${finalConfig.leftCount}] width: ${finalWidth}${fallbackUsed ? ' (FALLBACK - narrowest available)' : ''}`);
        
        // Show top valid configurations
        const sortedValid = validEvals.sort((a, b) => b.width - a.width); // Descending (widest first)
        console.log(`  Top 3 valid widths:`);
        for (let i = 0; i < Math.min(3, sortedValid.length); i++) {
            const result = sortedValid[i];
            console.log(`    ${i + 1}. [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}] width: ${result.width}`);
        }
        
        if (failedEvals.length > 0) {
            console.log(`  Failed configurations:`);
            failedEvals.forEach(result => {
                console.log(`    [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}]: ${result.error}`);
            });
        }
        console.log(`=== END FINDBESTWIDTH-CONSTRAINED DEBUG ===\n`);
    }
    
    // Return the best configuration within constraint, or narrowest as fallback
    const validEvals = evaluationResults.filter(r => r.success && r.withinConstraint);
    return validEvals.length > 0 ? bestConfig : fallbackConfig;
}

function findBestTurnConfigurationByHeightConstraint(players: any[], options: RenderOptions): TurnBasedLayout {
    const playerCount = players.length;
    const allTurnConfigs = generateAllTurnConfigurations(playerCount);
    const targetHeight = options.targetHeight!;
    
    // Debug: Check if we're using a custom evaluation title
    const evaluationTitle = (options as any)._evaluationTitle;
    const isInstrumented = evaluationTitle && (evaluationTitle.includes('Grim') || evaluationTitle.includes('long title'));
    
    if (isInstrumented) {
        console.log(`\n=== FINDBESTHEIGHT-CONSTRAINED DEBUG: title="${evaluationTitle}" ===`);
        console.log(`Generated ${allTurnConfigs.length} configurations for ${playerCount} players`);
        console.log(`Target height constraint: ${targetHeight} characters`);
    }
    
    // Evaluate each configuration and find the one that maximizes height usage without exceeding target
    let bestConfig = allTurnConfigs[0];
    let bestHeight = 0; // We want to maximize height usage within constraint
    let bestWidth = Number.POSITIVE_INFINITY; // Secondary: minimize width
    let bestTopCount = 0; // Tertiary: maximize top-side players
    let fallbackConfig = allTurnConfigs[0];
    let fallbackHeight = Number.POSITIVE_INFINITY; // Track shortest layout as fallback
    let evaluationResults: any[] = [];
    
    for (const config of allTurnConfigs) {
        try {
            const width = evaluateLayoutWidth(players, config, options);
            const height = evaluateLayoutHeight(players, config, options);
            const withinConstraint = height <= targetHeight;
            
            evaluationResults.push({ config, width, height, withinConstraint, success: true });
            
            // Track the shortest layout as fallback (in case nothing fits)
            if (height < fallbackHeight) {
                fallbackHeight = height;
                fallbackConfig = config;
            }
            
            // Only consider configurations that fit within the constraint for best choice
            if (withinConstraint) {
                let isBetter = false;
                
                if (height > bestHeight) {
                    // Primary criterion: maximize height
                    isBetter = true;
                } else if (height === bestHeight) {
                    if (width < bestWidth) {
                        // Secondary criterion: minimize width (when heights are equal)
                        isBetter = true;
                    } else if (width === bestWidth) {
                        if (config.topCount > bestTopCount) {
                            // Tertiary criterion: maximize top-side players (when both height and width are equal)
                            isBetter = true;
                        }
                    }
                }
                
                if (isBetter) {
                    bestHeight = height;
                    bestWidth = width;
                    bestTopCount = config.topCount;
                    bestConfig = config;
                }
            }
            
            if (isInstrumented) {
                const status = withinConstraint ? (height === bestHeight ? '← NEW BEST' : '✓') : '✗ TOO TALL';
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] height: ${height} ${status}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            evaluationResults.push({ config, width: Number.POSITIVE_INFINITY, height: Number.POSITIVE_INFINITY, withinConstraint: false, success: false, error: errorMessage });
            
            if (isInstrumented) {
                console.log(`  [${config.topCount},${config.rightCount},${config.bottomCount},${config.leftCount}] FAILED: ${errorMessage}`);
            }
        }
    }
    
    if (isInstrumented) {
        const successfulEvals = evaluationResults.filter(r => r.success);
        const validEvals = successfulEvals.filter(r => r.withinConstraint);
        const tooTallEvals = successfulEvals.filter(r => !r.withinConstraint);
        const failedEvals = evaluationResults.filter(r => !r.success);
        
        console.log(`\nSUMMARY:`);
        console.log(`  Total configurations: ${allTurnConfigs.length}`);
        console.log(`  Successful evaluations: ${successfulEvals.length}`);
        console.log(`  Within height constraint: ${validEvals.length}`);
        console.log(`  Too tall (exceeds ${targetHeight}): ${tooTallEvals.length}`);
        console.log(`  Failed evaluations: ${failedEvals.length}`);
        const finalConfig = validEvals.length > 0 ? bestConfig : fallbackConfig;
        const finalHeight = validEvals.length > 0 ? bestHeight : fallbackHeight;
        const fallbackUsed = validEvals.length === 0;
        
        console.log(`  Selected best: [${finalConfig.topCount},${finalConfig.rightCount},${finalConfig.bottomCount},${finalConfig.leftCount}] height: ${finalHeight}${fallbackUsed ? ' (FALLBACK - shortest available)' : ''}`);
        
        // Show top valid configurations
        const sortedValid = validEvals.sort((a, b) => b.height - a.height); // Descending (tallest first)
        console.log(`  Top 3 valid heights:`);
        for (let i = 0; i < Math.min(3, sortedValid.length); i++) {
            const result = sortedValid[i];
            console.log(`    ${i + 1}. [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}] height: ${result.height}`);
        }
        
        if (failedEvals.length > 0) {
            console.log(`  Failed configurations:`);
            failedEvals.forEach(result => {
                console.log(`    [${result.config.topCount},${result.config.rightCount},${result.config.bottomCount},${result.config.leftCount}]: ${result.error}`);
            });
        }
        console.log(`=== END FINDBESTHEIGHT-CONSTRAINED DEBUG ===\n`);
    }
    
    // Return the best configuration within constraint, or shortest as fallback
    const validEvals = evaluationResults.filter(r => r.success && r.withinConstraint);
    return validEvals.length > 0 ? bestConfig : fallbackConfig;
}

/**
 * Evaluates how "square-like" a layout configuration is by measuring actual rendered dimensions.
 * Returns a score where lower is better (0 = perfect square).
 * 
 * @param players - The players to layout
 * @param layout - The turn configuration to evaluate  
 * @param options - Render options (without tokens for layout evaluation)
 * @returns Score where 0 is perfect square, higher values are less square
 */
function evaluateLayoutSquareness(players: any[], layout: TurnBasedLayout, options: RenderOptions): number {
    // Create a copy of options that uses worst-case formatting for robust layout measurement
    const layoutOptions: RenderOptions = {
        ...options,
        mode: 'explicit-turns',
        explicitTurns: [layout.topCount, layout.rightCount, layout.bottomCount, layout.leftCount],
        // Flag to ensure title logic doesn't affect layout evaluation
        _isEvaluation: true,
        // Use worst-case formatting (*~~player~~*) to ensure layouts are robust to all future game states
        _forceWorstCaseFormatting: true,
        // Pass through evaluation title if specified
        _evaluationTitle: (options as any)._evaluationTitle
    };
    
    // Create players without tokens for layout measurement, but keep original alive/ghost state
    // The worst-case formatting will be handled by formatPlayerDisplayText()
    const playersWithoutTokens = players.map(player => ({
        ...player,
        tokens: [] // Remove tokens for pure layout evaluation
    }));
    
    const grimoire = { players: playersWithoutTokens };
    
    // Render this configuration and measure dimensions
    try {
        const rendered = renderGrimoireToAsciiArt(grimoire, layoutOptions);
        const dimensions = measureContentDimensions(rendered);
        
        // Calculate "squareness" score: how far the visual aspect ratio is from 1.0
        // Character dimensions: 6 points wide, 10 points tall (1.67:1 height:width ratio)
        const characterAspectRatio = 10 / 6; // 1.67
        const visualAspectRatio = dimensions.width / (dimensions.height * characterAspectRatio);
        const squarenessScore = Math.abs(visualAspectRatio - 1.0);
        
        return squarenessScore;
    } catch (error) {
        // If rendering fails, return a very high score (worst possible)
        return Number.POSITIVE_INFINITY;
    }
}

/**
 * Evaluates the total 2D area (width × height) of a layout configuration.
 * Returns the area in character units, where lower is better (more compact).
 * 
 * @param players - The players to layout
 * @param layout - The turn configuration to evaluate  
 * @param options - Render options (without tokens for layout evaluation)
 * @returns Area in character units (width × height)
 */
function evaluateLayoutArea(players: any[], layout: TurnBasedLayout, options: RenderOptions): number {
    // Create a copy of options that uses worst-case formatting for robust layout measurement
    const layoutOptions: RenderOptions = {
        ...options,
        mode: 'explicit-turns',
        explicitTurns: [layout.topCount, layout.rightCount, layout.bottomCount, layout.leftCount],
        // Flag to ensure title logic doesn't affect layout evaluation
        _isEvaluation: true,
        // Use worst-case formatting (*~~player~~*) to ensure layouts are robust to all future game states
        _forceWorstCaseFormatting: true,
        // Pass through evaluation title if specified
        _evaluationTitle: (options as any)._evaluationTitle
    };
    
    // Create players without tokens for layout measurement, but keep original alive/ghost state
    // The worst-case formatting will be handled by formatPlayerDisplayText()
    const playersWithoutTokens = players.map(player => ({
        ...player,
        tokens: [] // Remove tokens for pure layout evaluation
    }));
    
    const grimoire = { players: playersWithoutTokens };
    
    // Render this configuration and measure dimensions
    try {
        const rendered = renderGrimoireToAsciiArt(grimoire, layoutOptions);
        const dimensions = measureContentDimensions(rendered);
        
        // Calculate total area: width × height
        const area = dimensions.width * dimensions.height;
        
        return area;
    } catch (error) {
        // If rendering fails, return a very high area (worst possible)
        return Number.POSITIVE_INFINITY;
    }
}

/**
 * Evaluates the maximum dimension (max of width or height) of a layout configuration.
 * Returns the maximum dimension in character units, where lower is better (more balanced).
 * 
 * @param players - The players to layout
 * @param layout - The turn configuration to evaluate  
 * @param options - Render options (without tokens for layout evaluation)
 * @returns Maximum dimension in character units (max(width, height))
 */
function evaluateLayoutMaxDimension(players: any[], layout: TurnBasedLayout, options: RenderOptions): number {
    // Create a copy of options that uses worst-case formatting for robust layout measurement
    const layoutOptions: RenderOptions = {
        ...options,
        mode: 'explicit-turns',
        explicitTurns: [layout.topCount, layout.rightCount, layout.bottomCount, layout.leftCount],
        // Flag to ensure title logic doesn't affect layout evaluation
        _isEvaluation: true,
        // Use worst-case formatting (*~~player~~*) to ensure layouts are robust to all future game states
        _forceWorstCaseFormatting: true,
        // Pass through evaluation title if specified
        _evaluationTitle: (options as any)._evaluationTitle
    };
    
    // Create players without tokens for layout measurement, but keep original alive/ghost state
    // The worst-case formatting will be handled by formatPlayerDisplayText()
    const playersWithoutTokens = players.map(player => ({
        ...player,
        tokens: [] // Remove tokens for pure layout evaluation
    }));
    
    const grimoire = { players: playersWithoutTokens };
    
    // Render this configuration and measure dimensions
    try {
        const rendered = renderGrimoireToAsciiArt(grimoire, layoutOptions);
        const dimensions = measureContentDimensions(rendered);
        
        // Calculate maximum dimension: max(width, height)
        const maxDimension = Math.max(dimensions.width, dimensions.height);
        
        return maxDimension;
    } catch (error) {
        // If rendering fails, return a very high max dimension (worst possible)
        return Number.POSITIVE_INFINITY;
    }
}

/**
 * Evaluates the perimeter (width + height) of a layout configuration.
 * Returns the perimeter in character units, where lower is better (more compact).
 * 
 * @param players - The players to layout
 * @param layout - The turn configuration to evaluate  
 * @param options - Render options (without tokens for layout evaluation)
 * @returns Perimeter in character units (width + height)
 */
function evaluateLayoutPerimeter(players: any[], layout: TurnBasedLayout, options: RenderOptions): number {
    // Create a copy of options that uses worst-case formatting for robust layout measurement
    const layoutOptions: RenderOptions = {
        ...options,
        mode: 'explicit-turns',
        explicitTurns: [layout.topCount, layout.rightCount, layout.bottomCount, layout.leftCount],
        // Flag to ensure title logic doesn't affect layout evaluation
        _isEvaluation: true,
        // Use worst-case formatting (*~~player~~*) to ensure layouts are robust to all future game states
        _forceWorstCaseFormatting: true,
        // Pass through evaluation title if specified
        _evaluationTitle: (options as any)._evaluationTitle
    };
    
    // Create players without tokens for layout measurement, but keep original alive/ghost state
    // The worst-case formatting will be handled by formatPlayerDisplayText()
    const playersWithoutTokens = players.map(player => ({
        ...player,
        tokens: [] // Remove tokens for pure layout evaluation
    }));
    
    const grimoire = { players: playersWithoutTokens };
    
    // Render this configuration and measure dimensions
    try {
        const rendered = renderGrimoireToAsciiArt(grimoire, layoutOptions);
        const dimensions = measureContentDimensions(rendered);
        
        // Calculate perimeter: width + height
        const perimeter = dimensions.width + dimensions.height;
        
        return perimeter;
    } catch (error) {
        // If rendering fails, return a very high perimeter (worst possible)
        return Number.POSITIVE_INFINITY;
    }
}

/**
 * Evaluates the area-to-perimeter ratio of a layout configuration.
 * Returns the ratio (area / perimeter), where higher is better (more efficient).
 * 
 * @param players - The players to layout
 * @param layout - The turn configuration to evaluate  
 * @param options - Render options (without tokens for layout evaluation)
 * @returns Area-to-perimeter ratio (higher = more efficient)
 */
function evaluateLayoutAreaPerimeterRatio(players: any[], layout: TurnBasedLayout, options: RenderOptions): number {
    // Create a copy of options that uses worst-case formatting for robust layout measurement
    const layoutOptions: RenderOptions = {
        ...options,
        mode: 'explicit-turns',
        explicitTurns: [layout.topCount, layout.rightCount, layout.bottomCount, layout.leftCount],
        // Flag to ensure title logic doesn't affect layout evaluation
        _isEvaluation: true,
        // Use worst-case formatting (*~~player~~*) to ensure layouts are robust to all future game states
        _forceWorstCaseFormatting: true,
        // Pass through evaluation title if specified
        _evaluationTitle: (options as any)._evaluationTitle
    };
    
    // Create players without tokens for layout measurement, but keep original alive/ghost state
    // The worst-case formatting will be handled by formatPlayerDisplayText()
    const playersWithoutTokens = players.map(player => ({
        ...player,
        tokens: [] // Remove tokens for pure layout evaluation
    }));
    
    const grimoire = { players: playersWithoutTokens };
    
    // Render this configuration and measure dimensions
    try {
        const rendered = renderGrimoireToAsciiArt(grimoire, layoutOptions);
        const dimensions = measureContentDimensions(rendered);
        
        // Calculate area-to-perimeter ratio: area / perimeter
        const area = dimensions.width * dimensions.height;
        const perimeter = dimensions.width + dimensions.height;
        const ratio = perimeter > 0 ? area / perimeter : 0;
        
        return ratio;
    } catch (error) {
        // If rendering fails, return a very low ratio (worst possible)
        return 0;
    }
}

/**
 * Evaluates the area-to-perimeter-squared ratio of a layout configuration.
 * Returns the ratio (area / perimeter^2), where higher is better (more compact).
 * 
 * @param players - The players to layout
 * @param layout - The turn configuration to evaluate  
 * @param options - Render options (without tokens for layout evaluation)
 * @returns Area-to-perimeter-squared ratio (higher = more compact)
 */
function evaluateLayoutAreaPerimeter2Ratio(players: any[], layout: TurnBasedLayout, options: RenderOptions): number {
    // Create a copy of options that uses worst-case formatting for robust layout measurement
    const layoutOptions: RenderOptions = {
        ...options,
        mode: 'explicit-turns',
        explicitTurns: [layout.topCount, layout.rightCount, layout.bottomCount, layout.leftCount],
        // Flag to ensure title logic doesn't affect layout evaluation
        _isEvaluation: true,
        // Use worst-case formatting (*~~player~~*) to ensure layouts are robust to all future game states
        _forceWorstCaseFormatting: true,
        // Pass through evaluation title if specified
        _evaluationTitle: (options as any)._evaluationTitle
    };
    
    // Create players without tokens for layout measurement, but keep original alive/ghost state
    // The worst-case formatting will be handled by formatPlayerDisplayText()
    const playersWithoutTokens = players.map(player => ({
        ...player,
        tokens: [] // Remove tokens for pure layout evaluation
    }));
    
    const grimoire = { players: playersWithoutTokens };
    
    // Render this configuration and measure dimensions
    try {
        const rendered = renderGrimoireToAsciiArt(grimoire, layoutOptions);
        const dimensions = measureContentDimensions(rendered);
        
        // Calculate area-to-perimeter-squared ratio: area / perimeter^2
        const area = dimensions.width * dimensions.height;
        const perimeter = dimensions.width + dimensions.height;
        const ratio = perimeter > 0 ? area / (perimeter * perimeter) : 0;
        
        return ratio;
    } catch (error) {
        // If rendering fails, return a very low ratio (worst possible)
        return 0;
    }
}


/**
 * Evaluates the total width of a layout configuration.
 * Returns the width in character units (including borders and title).
 *
 * @param players - The players to layout
 * @param layout - The turn configuration to evaluate
 * @param options - Render options (without tokens for layout evaluation)
 * @returns Width in character units
 */
function evaluateLayoutWidth(players: any[], layout: TurnBasedLayout, options: RenderOptions): number {
    // Create a copy of options that uses worst-case formatting for robust layout measurement
    const layoutOptions: RenderOptions = {
        ...options,
        mode: 'explicit-turns',
        explicitTurns: [layout.topCount, layout.rightCount, layout.bottomCount, layout.leftCount],
        // Flag to ensure title logic doesn't affect layout evaluation
        _isEvaluation: true,
        // Use worst-case formatting (*~~player~~*) to ensure layouts are robust to all future game states
        _forceWorstCaseFormatting: true,
        // Pass through evaluation title if specified
        _evaluationTitle: (options as any)._evaluationTitle
    };
    
    // Create players without tokens for layout measurement, but keep original alive/ghost state
    // The worst-case formatting will be handled by formatPlayerDisplayText()
    const playersWithoutTokens = players.map(player => ({
        ...player, 
        tokens: [] // Remove tokens for pure layout evaluation
    }));
    
    const grimoire = { players: playersWithoutTokens };
    
    // Render this configuration and measure dimensions
    try {
        const rendered = renderGrimoireToAsciiArt(grimoire, layoutOptions);
        const dimensions = measureRenderedDimensions(rendered);
        
        // Return the total width (including borders and title)
        return dimensions.width;
    } catch (error) {
        // If rendering fails, return a very high width (worst possible)
        return Number.POSITIVE_INFINITY;
    }
}

/**
 * Evaluates the total height of a layout configuration.
 * Returns the height in character units (including borders and title).
 *
 * @param players - The players to layout
 * @param layout - The turn configuration to evaluate
 * @param options - Render options (without tokens for layout evaluation)
 * @returns Height in character units
 */
function evaluateLayoutHeight(players: any[], layout: TurnBasedLayout, options: RenderOptions): number {
    // Create a copy of options that uses worst-case formatting for robust layout measurement
    const layoutOptions: RenderOptions = {
        ...options,
        mode: 'explicit-turns',
        explicitTurns: [layout.topCount, layout.rightCount, layout.bottomCount, layout.leftCount],
        // Flag to ensure title logic doesn't affect layout evaluation
        _isEvaluation: true,
        // Use worst-case formatting (*~~player~~*) to ensure layouts are robust to all future game states
        _forceWorstCaseFormatting: true,
        // Pass through evaluation title if specified
        _evaluationTitle: (options as any)._evaluationTitle
    };
    
    // Create players without tokens for layout measurement, but keep original alive/ghost state
    // The worst-case formatting will be handled by formatPlayerDisplayText()
    const playersWithoutTokens = players.map(player => ({
        ...player, 
        tokens: [] // Remove tokens for pure layout evaluation
    }));
    
    const grimoire = { players: playersWithoutTokens };
    
    // Render this configuration and measure dimensions
    try {
        const rendered = renderGrimoireToAsciiArt(grimoire, layoutOptions);
        const dimensions = measureRenderedDimensions(rendered);
        
        // Return the total height (including borders and title)
        return dimensions.height;
    } catch (error) {
        // If rendering fails, return a very high height (worst possible)
        return Number.POSITIVE_INFINITY;
    }
}

/**
 * Measures the actual width and height of rendered ASCII art including borders and titles.
 * Used for testing complete output formatting and final display measurements.
 * 
 * @param rendered - The rendered ASCII art string
 * @returns Object with width and height in characters
 */
export function measureRenderedDimensions(rendered: string): { width: number; height: number } {
    const lines = rendered.split('\n');
    const height = lines.length;
    const width = Math.max(...lines.map(line => line.length));
    
    return { width, height };
}

/**
 * Measures only the content area of rendered ASCII art, excluding borders and titles.
 * This provides more accurate layout comparisons by focusing on actual content dimensions.
 * 
 * @param rendered - The rendered ASCII art string with borders
 * @returns Object with content-only width and height in characters
 */
export function measureContentDimensions(rendered: string): { width: number; height: number } {
    const lines = rendered.split('\n');
    
    // Skip top and bottom border lines (first and last)
    const contentLines = lines.slice(1, -1);
    
    if (contentLines.length === 0) {
        return { width: 0, height: 0 };
    }
    
    // Calculate content height (excluding borders)
    const height = contentLines.length;
    
    // Calculate content width by finding max width excluding side borders
    // Each content line has format: '│<content>│' so we exclude first and last characters
    const contentWidths = contentLines.map(line => {
        if (line.length <= 2) return 0; // Handle edge case of very short lines
        return line.substring(1, line.length - 1).length; // Remove left and right borders
    });
    
    const width = Math.max(0, ...contentWidths);
    
    return { width, height };
}