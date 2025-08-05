// src/lib/parkFactors.ts

// As per the blueprint, this is the static, internal JSON file mapping venues to their park factors.
// Data sourced from FanGraphs and Baseball Savant.

export interface ParkFactorSet {
    hrFactor: number;
    singleFactor: number;
    doublesFactor: number;
    // Add any other factors you track here
}

// Define the type for our database object for strong type-checking
type ParkFactorsDB = Record<string, ParkFactorSet>;

export const parkFactorsDB: ParkFactorsDB = {
    "Coors Field": { hrFactor: 1.04, singleFactor: 1.15, doublesFactor: 1.19 },
    "Fenway Park": { hrFactor: 0.91, singleFactor: 1.05, doublesFactor: 1.24 },
    "Chase Field": { hrFactor: 0.90, singleFactor: 1.03, doublesFactor: 1.18 },
    "Great American Ball Park": { hrFactor: 1.25, singleFactor: 0.96, doublesFactor: 0.99 },
    "Target Field": { hrFactor: 1.05, singleFactor: 0.99, doublesFactor: 1.10 },
    "Angel Stadium": { hrFactor: 1.13, singleFactor: 0.98, doublesFactor: 0.91 },
    "Nationals Park": { hrFactor: 0.94, singleFactor: 1.09, doublesFactor: 0.96 },
    "Kauffman Stadium": { hrFactor: 0.83, singleFactor: 1.04, doublesFactor: 1.13 },
    "Citizens Bank Park": { hrFactor: 1.13, singleFactor: 0.99, doublesFactor: 0.96 },
    "Oriole Park at Camden Yards": { hrFactor: 1.06, singleFactor: 1.05, doublesFactor: 0.98 },
    "Dodger Stadium": { hrFactor: 1.28, singleFactor: 0.92, doublesFactor: 0.97 },
    "loanDepot park": { hrFactor: 0.90, singleFactor: 1.05, doublesFactor: 1.07 },
    "Daikin Park": { hrFactor: 1.05, singleFactor: 0.99, doublesFactor: 0.98 },
    "Busch Stadium": { hrFactor: 0.90, singleFactor: 1.07, doublesFactor: 1.05 },
    "Yankee Stadium": { hrFactor: 1.21, singleFactor: 0.90, doublesFactor: 0.90 },
    "Truist Park": { hrFactor: 1.01, singleFactor: 1.03, doublesFactor: 0.96 },
    "Rogers Centre": { hrFactor: 1.03, singleFactor: 0.97, doublesFactor: 1.06 },
    "Comerica Park": { hrFactor: 0.94, singleFactor: 1.00, doublesFactor: 0.92 },
    "PNC Park": { hrFactor: 0.78, singleFactor: 1.03, doublesFactor: 1.14 },
    "Citi Field": { hrFactor: 1.05, singleFactor: 0.91, doublesFactor: 0.88 },
    "Petco Park": { hrFactor: 1.03, singleFactor: 0.97, doublesFactor: 0.96 },
    "Globe Life Field": { hrFactor: 1.06, singleFactor: 0.98, doublesFactor: 0.95 },
    "Rate Field": { hrFactor: 0.96, singleFactor: 1.00, doublesFactor: 0.92 },
    "Wrigley Field": { hrFactor: 0.96, singleFactor: 0.99, doublesFactor: 0.86 },
    "Progressive Field": { hrFactor: 0.85, singleFactor: 0.99, doublesFactor: 1.08 },
    "Oracle Park": { hrFactor: 0.80, singleFactor: 1.04, doublesFactor: 1.02 },
};
