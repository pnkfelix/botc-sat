/**
 * Type definitions for ASCII grimoire rendering system
 */

export interface RenderOptions {
    mode: 'auto' | 'width-constrained' | 'height-constrained' | 'explicit-turns';
    targetWidth?: number;
    targetHeight?: number;
    showColumnNumbers?: boolean; // Whether to show (4), (12), etc.
    explicitTurns?: [number, number, number, number]; // [top, right, bottom, left] counts
}

// Abstract grid system for building ASCII art
export interface GridCell {
    content: string;
    row: number;
    col: number;
}

export interface AbstractGrid {
    cells: GridCell[];
    minRow: number;
    maxRow: number;
    minCol: number;
    maxCol: number;
}

// Turn-based layout system
export interface TurnBasedLayout {
    topCount: number;
    rightCount: number; 
    bottomCount: number;
    leftCount: number;
}

export interface PlayerPosition {
    player: { name: string; role: string; tokens: string[] };
    side: 'top' | 'right' | 'bottom' | 'left';
    sideIndex: number; // position within that side (0-based)
}