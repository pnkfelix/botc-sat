/**
 * Type definitions for ASCII grimoire rendering system
 */

/**
 * Abstraction: Configuration for ASCII grimoire rendering behavior and constraints.
 * 
 * Represents rendering parameters that control how a grimoire is laid out and displayed
 * as ASCII art. The abstraction maps user preferences to algorithmic choices.
 * 
 * Representation Invariants:
 * - If mode === 'explicit-turns', then explicitTurns must be defined
 * - If mode === 'width-constrained', then targetWidth must be defined and > 0
 * - If mode === 'height-constrained', then targetHeight must be defined and > 0
 * - explicitTurns[0] + explicitTurns[1] + explicitTurns[2] + explicitTurns[3] must equal total player count
 * - All counts in explicitTurns must be >= 0, with at least one side having >= 1 player
 * 
 * Abstract Mapping:
 * - mode determines the layout algorithm: auto-selection, constraint optimization, or manual specification
 * - targetWidth/targetHeight represent visual space constraints in character units
 * - showColumnNumbers controls debug information display
 * - useAbbreviations controls whether to use role abbreviations in reminder tokens
 * - explicitTurns maps to [top-side, right-side, bottom-side, left-side] player distribution
 */
export interface RenderOptions {
    mode: 'auto' | 'width-constrained' | 'height-constrained' | 'explicit-turns';
    targetWidth?: number;
    targetHeight?: number;
    showColumnNumbers?: boolean; // Whether to show (4), (12), etc.
    useAbbreviations?: boolean; // Whether to use role abbreviations in reminder tokens (default: true)
    explicitTurns?: [number, number, number, number]; // [top, right, bottom, left] counts
}

/**
 * Abstraction: A positioned text element in a 2D ASCII art coordinate system.
 * 
 * Represents a single piece of text content placed at specific coordinates within
 * an abstract grid space. The grid uses mathematical coordinates (row, col) where
 * (0,0) represents the top-left origin.
 * 
 * Representation Invariants:
 * - content must be a non-empty string (empty content should not create cells)
 * - row >= 0 (non-negative coordinate)
 * - col >= 0 (non-negative coordinate)
 * - content should not contain newline characters (single-line text only)
 * 
 * Abstract Mapping:
 * - (row, col) maps to mathematical 2D coordinates where row=Y-axis, col=X-axis
 * - content represents the literal text that will appear at that position
 * - Multiple cells can exist at different positions; cells at same position would overlap
 */
export interface GridCell {
    content: string;
    row: number;
    col: number;
}

/**
 * Abstraction: A sparse 2D grid containing positioned text elements with computed bounds.
 * 
 * Represents a collection of text elements positioned in 2D space, along with the 
 * bounding box that contains all elements. This abstraction allows building ASCII art
 * incrementally by placing individual text pieces, then rendering the final result.
 * 
 * Representation Invariants:
 * - If cells.length === 0, then minRow === maxRow === minCol === maxCol === 0
 * - If cells.length > 0, then:
 *   - minRow === min(cell.row for cell in cells)
 *   - maxRow === max(cell.row for cell in cells)  
 *   - minCol === min(cell.col for cell in cells)
 *   - maxCol === max(cell.col + cell.content.length - 1 for cell in cells)
 *   - minRow <= maxRow, minCol <= maxCol
 * - All cells must satisfy GridCell invariants
 * 
 * Abstract Mapping:
 * - cells represents the sparse placement of text content
 * - (minRow, minCol) to (maxRow, maxCol) defines the minimal bounding rectangle
 * - Grid coordinates map to final ASCII art where row=line number, col=character position
 * - Bounds enable efficient rendering by determining final output dimensions
 */
export interface AbstractGrid {
    cells: GridCell[];
    minRow: number;
    maxRow: number;
    minCol: number;
    maxCol: number;
}

/**
 * Abstraction: A clockwise distribution of players around a rectangular game table.
 * 
 * Represents how players are seated around a BOTC game table, with players arranged
 * on four sides of a rectangle. The distribution follows clockwise order: top side
 * (left-to-right), right side (top-to-bottom), bottom side (right-to-left), left side (bottom-to-top).
 * 
 * Representation Invariants:
 * - topCount + rightCount + bottomCount + leftCount === total player count
 * - topCount >= 1 (at least one player must be on top side for visual stability)
 * - rightCount, bottomCount, leftCount >= 0 (other sides can be empty)
 * - All counts must be integers
 * 
 * Abstract Mapping:
 * - topCount: players seated on top edge, positions 0..(topCount-1) left-to-right
 * - rightCount: players on right edge, positions 0..(rightCount-1) top-to-bottom  
 * - bottomCount: players on bottom edge, positions 0..(bottomCount-1) right-to-left
 * - leftCount: players on left edge, positions 0..(leftCount-1) bottom-to-top
 * - Total clockwise order: top[0..n], right[0..m], bottom[0..p], left[0..q]
 */
export interface TurnBasedLayout {
    topCount: number;
    rightCount: number; 
    bottomCount: number;
    leftCount: number;
}

/**
 * Abstraction: A player's assigned position within a turn-based seating arrangement.
 * 
 * Represents a single player placed at a specific position on one side of the game table.
 * Combines the player's game data (name, role, tokens) with their geometric position
 * in the seating layout. Enables mapping from game entities to visual placement.
 * 
 * Representation Invariants:
 * - player.name must be non-empty string
 * - player.role must be non-empty string  
 * - player.tokens must be valid array (can be empty)
 * - side must be one of the four valid table sides
 * - sideIndex >= 0 and < sideCount for the corresponding side in the layout
 * - sideIndex represents 0-based position within that specific side
 * 
 * Abstract Mapping:
 * - player contains the game-state information for this participant
 * - (side, sideIndex) maps to geometric position: side determines table edge,
 *   sideIndex determines position along that edge
 * - Combined data enables rendering player info at calculated visual coordinates
 * - Multiple PlayerPositions form complete seating arrangement around table
 */
export interface PlayerPosition {
    player: { name: string; role: string; tokens: string[] };
    side: 'top' | 'right' | 'bottom' | 'left';
    sideIndex: number; // position within that side (0-based)
}