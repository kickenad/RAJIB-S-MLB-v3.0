// src/lib/coversScraperService.ts

export interface CoversGameOdds {
    matchup: string;
    publicBetsHome: number;
    publicBetsAway: number;
    lineOpen: string;
    lineCurrent: string;
    totalOpen: string;
    totalCurrent: string;
    updatedAt: string;
    gameId: string; // Added for unique identification
}
