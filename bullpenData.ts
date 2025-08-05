// src/lib/bullpenData.ts

export interface PitcherUsage {
    playerName: string;
    pitchCounts: {
        fri: number;
        sat: number;
        sun: number;
        mon: number;
        tues: number;
    };
    last3DaysPitches: number;
    last5DaysPitches: number;
}

export interface BullpenData {
    [teamName: string]: PitcherUsage[];
}

export const bullpenUsageData: { bullpenUsage: BullpenData } = {
  "bullpenUsage": {
    "Arizona Diamondbacks": [
      {
        "playerName": "John Curtiss",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 28, "mon": 0, "tues": 14 },
        "last3DaysPitches": 42,
        "last5DaysPitches": 42
      },
      {
        "playerName": "Brandyn Garcia",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 12, "mon": 0, "tues": 18 },
        "last3DaysPitches": 30,
        "last5DaysPitches": 30
      },
      {
        "playerName": "Kyle Backhus",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 17, "tues": 0 },
        "last3DaysPitches": 17,
        "last5DaysPitches": 17
      },
      {
        "playerName": "Jake Woodford",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 0, "tues": 14 },
        "last3DaysPitches": 14,
        "last5DaysPitches": 14
      },
      {
        "playerName": "Kendall Graveman",
        "pitchCounts": { "fri": 0, "sat": 18, "sun": 0, "mon": 10, "tues": 0 },
        "last3DaysPitches": 10,
        "last5DaysPitches": 28
      },
      {
        "playerName": "Anthony DeSclafani",
        "pitchCounts": { "fri": 50, "sat": 0, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 50
      },
      {
        "playerName": "Kevin Ginkel",
        "pitchCounts": { "fri": 6, "sat": 0, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 6
      },
      {
        "playerName": "Andrew Saalfrank",
        "pitchCounts": { "fri": 0, "sat": 7, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 7
      }
    ],
    "Atlanta Braves": [
      {
        "playerName": "Dylan Dodd",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 49, "mon": 0, "tues": 0 },
        "last3DaysPitches": 49,
        "last5DaysPitches": 49
      },
      {
        "playerName": "Enyel De Los Santos",
        "pitchCounts": { "fri": 14, "sat": 2, "sun": 0, "mon": 0, "tues": 38 },
        "last3DaysPitches": 38,
        "last5DaysPitches": 54
      },
      {
        "playerName": "Rafael Montero",
        "pitchCounts": { "fri": 28, "sat": 0, "sun": 0, "mon": 14, "tues": 16 },
        "last3DaysPitches": 30,
        "last5DaysPitches": 58
      },
      {
        "playerName": "Daysbel Hernandez",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 25, "tues": 0 },
        "last3DaysPitches": 25,
        "last5DaysPitches": 25
      },
      {
        "playerName": "Aaron Bummer",
        "pitchCounts": { "fri": 14, "sat": 0, "sun": 0, "mon": 0, "tues": 23 },
        "last3DaysPitches": 23,
        "last5DaysPitches": 37
      },
      {
        "playerName": "Dylan Lee",
        "pitchCounts": { "fri": 0, "sat": 14, "sun": 0, "mon": 14, "tues": 0 },
        "last3DaysPitches": 14,
        "last5DaysPitches": 28
      },
      {
        "playerName": "Pierce Johnson",
        "pitchCounts": { "fri": 0, "sat": 10, "sun": 0, "mon": 9, "tues": 0 },
        "last3DaysPitches": 9,
        "last5DaysPitches": 19
      },
      {
        "playerName": "Raisel Iglesias",
        "pitchCounts": { "fri": 0, "sat": 20, "sun": 0, "mon": 7, "tues": 0 },
        "last3DaysPitches": 7,
        "last5DaysPitches": 27
      },
      {
        "playerName": "Dane Dunning",
        "pitchCounts": { "fri": 0, "sat": 23, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 23
      }
    ],
    "Baltimore Orioles": [
      {
        "playerName": "Corbin Martin",
        "pitchCounts": { "fri": 10, "sat": 0, "sun": 0, "mon": 21, "tues": 22 },
        "last3DaysPitches": 43,
        "last5DaysPitches": 53
      },
      {
        "playerName": "Andrew Kittredge",
        "pitchCounts": { "fri": 13, "sat": 0, "sun": 14, "mon": 0, "tues": 17 },
        "last3DaysPitches": 31,
        "last5DaysPitches": 44
      },
      {
        "playerName": "Yennier Cano",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 24, "mon": 0, "tues": 6 },
        "last3DaysPitches": 30,
        "last5DaysPitches": 30
      },
      {
        "playerName": "Keegan Akin",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 0, "tues": 17 },
        "last3DaysPitches": 17,
        "last5DaysPitches": 17
      },
      {
        "playerName": "Kade Strowd",
        "pitchCounts": { "fri": 0, "sat": 17, "sun": 0, "mon": 16, "tues": 0 },
        "last3DaysPitches": 16,
        "last5DaysPitches": 33
      },
      {
        "playerName": "Grant Wolfram",
        "pitchCounts": { "fri": 17, "sat": 0, "sun": 0, "mon": 12, "tues": 0 },
        "last3DaysPitches": 12,
        "last5DaysPitches": 29
      },
      {
        "playerName": "Colin Selby",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 10, "tues": 0 },
        "last3DaysPitches": 10,
        "last5DaysPitches": 10
      }
    ],
    "Boston Red Sox": [
      {
        "playerName": "Jordan Hicks",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 25, "mon": 23, "tues": 0 },
        "last3DaysPitches": 48,
        "last5DaysPitches": 48
      },
      {
        "playerName": "Jorge Alcala",
        "pitchCounts": { "fri": 27, "sat": 0, "sun": 0, "mon": 20, "tues": 20 },
        "last3DaysPitches": 40,
        "last5DaysPitches": 67
      },
      {
        "playerName": "Justin Wilson",
        "pitchCounts": { "fri": 0, "sat": 13, "sun": 17, "mon": 0, "tues": 17 },
        "last3DaysPitches": 34,
        "last5DaysPitches": 47
      },
      {
        "playerName": "Brennan Bernardino",
        "pitchCounts": { "fri": 8, "sat": 0, "sun": 9, "mon": 18, "tues": 0 },
        "last3DaysPitches": 27,
        "last5DaysPitches": 35
      },
      {
        "playerName": "Greg Weissert",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 14, "mon": 11, "tues": 0 },
        "last3DaysPitches": 25,
        "last5DaysPitches": 25
      },
      {
        "playerName": "Chris Murphy",
        "pitchCounts": { "fri": 31, "sat": 0, "sun": 0, "mon": 22, "tues": 0 },
        "last3DaysPitches": 22,
        "last5DaysPitches": 53
      },
      {
        "playerName": "Aroldis Chapman",
        "pitchCounts": { "fri": 0, "sat": 17, "sun": 11, "mon": 0, "tues": 3 },
        "last3DaysPitches": 14,
        "last5DaysPitches": 31
      },
      {
        "playerName": "Garrett Whitlock",
        "pitchCounts": { "fri": 0, "sat": 10, "sun": 0, "mon": 0, "tues": 12 },
        "last3DaysPitches": 12,
        "last5DaysPitches": 22
      }
    ],
    "Chicago Cubs": [
      {
        "playerName": "Ryan Pressly",
        "pitchCounts": { "fri": 0, "sat": 16, "sun": 0, "mon": 11, "tues": 27 },
        "last3DaysPitches": 38,
        "last5DaysPitches": 54
      },
      {
        "playerName": "Drew Pomeranz",
        "pitchCounts": { "fri": 18, "sat": 0, "sun": 20, "mon": 0, "tues": 17 },
        "last3DaysPitches": 37,
        "last5DaysPitches": 55
      },
      {
        "playerName": "Ryan Brasier",
        "pitchCounts": { "fri": 19, "sat": 0, "sun": 19, "mon": 0, "tues": 10 },
        "last3DaysPitches": 29,
        "last5DaysPitches": 48
      },
      {
        "playerName": "Brooks Kriske",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 0, "tues": 19 },
        "last3DaysPitches": 19,
        "last5DaysPitches": 19
      },
      {
        "playerName": "Gavin Hollowell",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 0, "tues": 19 },
        "last3DaysPitches": 19,
        "last5DaysPitches": 19
      },
      {
        "playerName": "Daniel Palencia",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 18, "mon": 0, "tues": 0 },
        "last3DaysPitches": 18,
        "last5DaysPitches": 18
      },
      {
        "playerName": "Caleb Thielbar",
        "pitchCounts": { "fri": 0, "sat": 8, "sun": 12, "mon": 0, "tues": 0 },
        "last3DaysPitches": 12,
        "last5DaysPitches": 20
      },
      {
        "playerName": "Brad Keller",
        "pitchCounts": { "fri": 0, "sat": 6, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 6
      }
    ],
    "Chicago White Sox": [
      {
        "playerName": "Grant Taylor",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 21, "mon": 15, "tues": 0 },
        "last3DaysPitches": 36,
        "last5DaysPitches": 36
      },
      {
        "playerName": "Mike Vasil",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 34, "mon": 0, "tues": 0 },
        "last3DaysPitches": 34,
        "last5DaysPitches": 34
      },
      {
        "playerName": "Jordan Leasure",
        "pitchCounts": { "fri": 0, "sat": 17, "sun": 0, "mon": 27, "tues": 0 },
        "last3DaysPitches": 27,
        "last5DaysPitches": 44
      },
      {
        "playerName": "Dan Altavilla",
        "pitchCounts": { "fri": 0, "sat": 25, "sun": 0, "mon": 0, "tues": 21 },
        "last3DaysPitches": 21,
        "last5DaysPitches": 46
      },
      {
        "playerName": "Tyler Gilbert",
        "pitchCounts": { "fri": 15, "sat": 13, "sun": 0, "mon": 0, "tues": 20 },
        "last3DaysPitches": 20,
        "last5DaysPitches": 48
      },
      {
        "playerName": "Tyler Alexander",
        "pitchCounts": { "fri": 0, "sat": 13, "sun": 19, "mon": 0, "tues": 0 },
        "last3DaysPitches": 19,
        "last5DaysPitches": 32
      },
      {
        "playerName": "Brandon Eisert",
        "pitchCounts": { "fri": 0, "sat": 24, "sun": 12, "mon": 0, "tues": 0 },
        "last3DaysPitches": 12,
        "last5DaysPitches": 36
      },
      {
        "playerName": "Steven Wilson",
        "pitchCounts": { "fri": 28, "sat": 0, "sun": 0, "mon": 11, "tues": 0 },
        "last3DaysPitches": 11,
        "last5DaysPitches": 39
      }
    ],
    "Cincinnati Reds": [
      {
        "playerName": "Emilio Pagan",
        "pitchCounts": { "fri": 11, "sat": 11, "sun": 13, "mon": 0, "tues": 25 },
        "last3DaysPitches": 38,
        "last5DaysPitches": 60
      },
      {
        "playerName": "Scott Barlow",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 29, "tues": 7 },
        "last3DaysPitches": 36,
        "last5DaysPitches": 36
      },
      {
        "playerName": "Graham Ashcraft",
        "pitchCounts": { "fri": 21, "sat": 25, "sun": 0, "mon": 0, "tues": 27 },
        "last3DaysPitches": 27,
        "last5DaysPitches": 73
      },
      {
        "playerName": "Tony Santillan",
        "pitchCounts": { "fri": 13, "sat": 21, "sun": 10, "mon": 0, "tues": 10 },
        "last3DaysPitches": 20,
        "last5DaysPitches": 54
      },
      {
        "playerName": "Taylor Rogers",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 18, "tues": 0 },
        "last3DaysPitches": 18,
        "last5DaysPitches": 18
      },
      {
        "playerName": "Brent Suter",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 16, "tues": 0 },
        "last3DaysPitches": 16,
        "last5DaysPitches": 16
      },
      {
        "playerName": "Lyon Richardson",
        "pitchCounts": { "fri": 17, "sat": 0, "sun": 0, "mon": 6, "tues": 0 },
        "last3DaysPitches": 6,
        "last5DaysPitches": 23
      },
      {
        "playerName": "Sam Moll",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 1, "tues": 0 },
        "last3DaysPitches": 1,
        "last5DaysPitches": 1
      }
    ],
    "Cleveland Guardians": [
      {
        "playerName": "Matt Festa",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 26, "mon": 0, "tues": 17 },
        "last3DaysPitches": 43,
        "last5DaysPitches": 43
      },
      {
        "playerName": "Tim Herrin",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 18, "tues": 12 },
        "last3DaysPitches": 30,
        "last5DaysPitches": 30
      },
      {
        "playerName": "Jakob Junis",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 24, "mon": 0, "tues": 0 },
        "last3DaysPitches": 24,
        "last5DaysPitches": 24
      },
      {
        "playerName": "Cade Smith",
        "pitchCounts": { "fri": 0, "sat": 12, "sun": 0, "mon": 22, "tues": 0 },
        "last3DaysPitches": 22,
        "last5DaysPitches": 34
      },
      {
        "playerName": "Hunter Gaddis",
        "pitchCounts": { "fri": 0, "sat": 12, "sun": 0, "mon": 15, "tues": 0 },
        "last3DaysPitches": 15,
        "last5DaysPitches": 27
      },
      {
        "playerName": "Kolby Allard",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 11, "mon": 0, "tues": 0 },
        "last3DaysPitches": 11,
        "last5DaysPitches": 11
      },
      {
        "playerName": "Emmanuel Clase",
        "pitchCounts": { "fri": 0, "sat": 27, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 27
      },
      {
        "playerName": "Erik Sabrowski",
        "pitchCounts": { "fri": 0, "sat": 10, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 10
      },
      {
        "playerName": "Nic Enright",
        "pitchCounts": { "fri": 0, "sat": 21, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 21
      }
    ],
    "Colorado Rockies": [
      {
        "playerName": "Jimmy Herget",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 17, "mon": 0, "tues": 43 },
        "last3DaysPitches": 60,
        "last5DaysPitches": 60
      },
      {
        "playerName": "Angel Chivilli",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 0, "tues": 40 },
        "last3DaysPitches": 40,
        "last5DaysPitches": 40
      },
      {
        "playerName": "Jaden Hill",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 18, "mon": 0, "tues": 15 },
        "last3DaysPitches": 33,
        "last5DaysPitches": 33
      },
      {
        "playerName": "Victor Vodnik",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 29, "tues": 0 },
        "last3DaysPitches": 29,
        "last5DaysPitches": 29
      },
      {
        "playerName": "Seth Halvorsen",
        "pitchCounts": { "fri": 11, "sat": 0, "sun": 0, "mon": 27, "tues": 0 },
        "last3DaysPitches": 27,
        "last5DaysPitches": 38
      },
      {
        "playerName": "Jake Bird",
        "pitchCounts": { "fri": 21, "sat": 0, "sun": 0, "mon": 19, "tues": 0 },
        "last3DaysPitches": 19,
        "last5DaysPitches": 40
      },
      {
        "playerName": "Tyler Kinley",
        "pitchCounts": { "fri": 13, "sat": 0, "sun": 0, "mon": 17, "tues": 0 },
        "last3DaysPitches": 17,
        "last5DaysPitches": 30
      },
      {
        "playerName": "Juan Mejia",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 12, "mon": 0, "tues": 0 },
        "last3DaysPitches": 12,
        "last5DaysPitches": 12
      },
      {
        "playerName": "Zach Agnos",
        "pitchCounts": { "fri": 0, "sat": 24, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 24
      }
    ],
    "Detroit Tigers": [
      {
        "playerName": "Luke Jackson",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 32, "mon": 0, "tues": 22 },
        "last3DaysPitches": 54,
        "last5DaysPitches": 54
      },
      {
        "playerName": "Brant Hurter",
        "pitchCounts": { "fri": 33, "sat": 0, "sun": 0, "mon": 0, "tues": 37 },
        "last3DaysPitches": 37,
        "last5DaysPitches": 70
      },
      {
        "playerName": "Tyler Holton",
        "pitchCounts": { "fri": 14, "sat": 0, "sun": 19, "mon": 0, "tues": 15 },
        "last3DaysPitches": 34,
        "last5DaysPitches": 48
      },
      {
        "playerName": "Chase Lee",
        "pitchCounts": { "fri": 0, "sat": 23, "sun": 0, "mon": 0, "tues": 23 },
        "last3DaysPitches": 23,
        "last5DaysPitches": 46
      },
      {
        "playerName": "Tommy Kahnle",
        "pitchCounts": { "fri": 0, "sat": 9, "sun": 0, "mon": 21, "tues": 0 },
        "last3DaysPitches": 21,
        "last5DaysPitches": 30
      },
      {
        "playerName": "Will Vest",
        "pitchCounts": { "fri": 0, "sat": 15, "sun": 0, "mon": 14, "tues": 0 },
        "last3DaysPitches": 14,
        "last5DaysPitches": 29
      },
      {
        "playerName": "Brenan Hanifee",
        "pitchCounts": { "fri": 11, "sat": 0, "sun": 8, "mon": 0, "tues": 0 },
        "last3DaysPitches": 8,
        "last5DaysPitches": 19
      },
      {
        "playerName": "Dietrich Enns",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 8, "mon": 0, "tues": 0 },
        "last3DaysPitches": 8,
        "last5DaysPitches": 8
      }
    ],
    "Houston Astros": [
      {
        "playerName": "Bryan Abreu",
        "pitchCounts": { "fri": 0, "sat": 7, "sun": 0, "mon": 22, "tues": 28 },
        "last3DaysPitches": 50,
        "last5DaysPitches": 57
      },
      {
        "playerName": "Bryan King",
        "pitchCounts": { "fri": 0, "sat": 12, "sun": 0, "mon": 17, "tues": 19 },
        "last3DaysPitches": 36,
        "last5DaysPitches": 48
      },
      {
        "playerName": "Steven Okert",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 29, "mon": 0, "tues": 0 },
        "last3DaysPitches": 29,
        "last5DaysPitches": 29
      },
      {
        "playerName": "Josh Hader",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 11, "tues": 13 },
        "last3DaysPitches": 24,
        "last5DaysPitches": 24
      },
      {
        "playerName": "Luis Contreras",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 23, "mon": 0, "tues": 0 },
        "last3DaysPitches": 23,
        "last5DaysPitches": 23
      },
      {
        "playerName": "Bennett Sousa",
        "pitchCounts": { "fri": 0, "sat": 25, "sun": 0, "mon": 0, "tues": 20 },
        "last3DaysPitches": 20,
        "last5DaysPitches": 45
      },
      {
        "playerName": "Kaleb Ort",
        "pitchCounts": { "fri": 38, "sat": 0, "sun": 10, "mon": 0, "tues": 0 },
        "last3DaysPitches": 10,
        "last5DaysPitches": 48
      },
      {
        "playerName": "Hector Neris",
        "pitchCounts": { "fri": 0, "sat": 25, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 25
      }
    ],
    "Kansas City Royals": [
      {
        "playerName": "Carlos Estevez",
        "pitchCounts": { "fri": 0, "sat": 20, "sun": 15, "mon": 0, "tues": 22 },
        "last3DaysPitches": 37,
        "last5DaysPitches": 57
      },
      {
        "playerName": "Lucas Erceg",
        "pitchCounts": { "fri": 0, "sat": 9, "sun": 16, "mon": 0, "tues": 20 },
        "last3DaysPitches": 36,
        "last5DaysPitches": 45
      },
      {
        "playerName": "Steven Cruz",
        "pitchCounts": { "fri": 0, "sat": 22, "sun": 0, "mon": 32, "tues": 0 },
        "last3DaysPitches": 32,
        "last5DaysPitches": 54
      },
      {
        "playerName": "Angel Zerpa",
        "pitchCounts": { "fri": 0, "sat": 9, "sun": 14, "mon": 0, "tues": 16 },
        "last3DaysPitches": 30,
        "last5DaysPitches": 39
      },
      {
        "playerName": "Sam Long",
        "pitchCounts": { "fri": 0, "sat": 25, "sun": 0, "mon": 30, "tues": 0 },
        "last3DaysPitches": 30,
        "last5DaysPitches": 55
      },
      {
        "playerName": "Taylor Clarke",
        "pitchCounts": { "fri": 0, "sat": 34, "sun": 0, "mon": 22, "tues": 0 },
        "last3DaysPitches": 22,
        "last5DaysPitches": 56
      },
      {
        "playerName": "Hunter Harvey",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 11, "mon": 0, "tues": 7 },
        "last3DaysPitches": 18,
        "last5DaysPitches": 18
      },
      {
        "playerName": "Jonathan Bowlan",
        "pitchCounts": { "fri": 0, "sat": 48, "sun": 0, "mon": 15, "tues": 0 },
        "last3DaysPitches": 15,
        "last5DaysPitches": 63
      },
      {
        "playerName": "John Schreiber",
        "pitchCounts": { "fri": 0, "sat": 20, "sun": 0, "mon": 0, "tues": 8 },
        "last3DaysPitches": 8,
        "last5DaysPitches": 28
      }
    ],
    "Los Angeles Angels": [
      {
        "playerName": "Connor Brogdon",
        "pitchCounts": { "fri": 0, "sat": 20, "sun": 0, "mon": 15, "tues": 19 },
        "last3DaysPitches": 34,
        "last5DaysPitches": 54
      },
      {
        "playerName": "Kenley Jansen",
        "pitchCounts": { "fri": 9, "sat": 0, "sun": 10, "mon": 12, "tues": 11 },
        "last3DaysPitches": 33,
        "last5DaysPitches": 42
      },
      {
        "playerName": "Brock Burke",
        "pitchCounts": { "fri": 12, "sat": 0, "sun": 27, "mon": 0, "tues": 6 },
        "last3DaysPitches": 33,
        "last5DaysPitches": 45
      },
      {
        "playerName": "Ryan Zeferjahn",
        "pitchCounts": { "fri": 18, "sat": 0, "sun": 0, "mon": 28, "tues": 0 },
        "last3DaysPitches": 28,
        "last5DaysPitches": 46
      },
      {
        "playerName": "Reid Detmers",
        "pitchCounts": { "fri": 17, "sat": 0, "sun": 10, "mon": 0, "tues": 15 },
        "last3DaysPitches": 25,
        "last5DaysPitches": 42
      },
      {
        "playerName": "Jose Quijada",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 13, "tues": 0 },
        "last3DaysPitches": 13,
        "last5DaysPitches": 13
      },
      {
        "playerName": "Carson Fulmer",
        "pitchCounts": { "fri": 0, "sat": 42, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 42
      },
      {
        "playerName": "Sam Bachman",
        "pitchCounts": { "fri": 0, "sat": 2, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 2
      }
    ],
    "Los Angeles Dodgers": [
      {
        "playerName": "Justin Wrobleski",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 38, "mon": 0, "tues": 0 },
        "last3DaysPitches": 38,
        "last5DaysPitches": 38
      },
      {
        "playerName": "Alex Vesia",
        "pitchCounts": { "fri": 15, "sat": 0, "sun": 0, "mon": 16, "tues": 12 },
        "last3DaysPitches": 28,
        "last5DaysPitches": 43
      },
      {
        "playerName": "Blake Treinen",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 25, "tues": 0 },
        "last3DaysPitches": 25,
        "last5DaysPitches": 25
      },
      {
        "playerName": "Jack Dreyer",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 9, "mon": 3, "tues": 9 },
        "last3DaysPitches": 21,
        "last5DaysPitches": 21
      },
      {
        "playerName": "Ben Casparius",
        "pitchCounts": { "fri": 19, "sat": 0, "sun": 0, "mon": 0, "tues": 14 },
        "last3DaysPitches": 14,
        "last5DaysPitches": 33
      },
      {
        "playerName": "Alexis Diaz",
        "pitchCounts": { "fri": 0, "sat": 17, "sun": 0, "mon": 0, "tues": 8 },
        "last3DaysPitches": 8,
        "last5DaysPitches": 25
      },
      {
        "playerName": "Anthony Banda",
        "pitchCounts": { "fri": 19, "sat": 0, "sun": 0, "mon": 0, "tues": 7 },
        "last3DaysPitches": 7,
        "last5DaysPitches": 26
      },
      {
        "playerName": "Kirby Yates",
        "pitchCounts": { "fri": 0, "sat": 17, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 17
      }
    ],
    "Miami Marlins": [
      {
        "playerName": "Valente Bellozo",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 9, "mon": 0, "tues": 28 },
        "last3DaysPitches": 37,
        "last5DaysPitches": 37
      },
      {
        "playerName": "Ronny Henriquez",
        "pitchCounts": { "fri": 12, "sat": 0, "sun": 25, "mon": 0, "tues": 11 },
        "last3DaysPitches": 36,
        "last5DaysPitches": 48
      },
      {
        "playerName": "Lake Bachar",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 31, "tues": 0 },
        "last3DaysPitches": 31,
        "last5DaysPitches": 31
      },
      {
        "playerName": "Josh Simpson",
        "pitchCounts": { "fri": 11, "sat": 0, "sun": 0, "mon": 22, "tues": 0 },
        "last3DaysPitches": 22,
        "last5DaysPitches": 33
      },
      {
        "playerName": "Calvin Faucher",
        "pitchCounts": { "fri": 26, "sat": 0, "sun": 0, "mon": 0, "tues": 20 },
        "last3DaysPitches": 20,
        "last5DaysPitches": 46
      },
      {
        "playerName": "Cade Gibson",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 15, "mon": 0, "tues": 0 },
        "last3DaysPitches": 15,
        "last5DaysPitches": 15
      },
      {
        "playerName": "Anthony Bender",
        "pitchCounts": { "fri": 23, "sat": 0, "sun": 13, "mon": 0, "tues": 0 },
        "last3DaysPitches": 13,
        "last5DaysPitches": 36
      },
      {
        "playerName": "Tyler Phillips",
        "pitchCounts": { "fri": 0, "sat": 45, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 45
      }
    ],
    "Milwaukee Brewers": [
      {
        "playerName": "Aaron Ashby",
        "pitchCounts": { "fri": 25, "sat": 0, "sun": 19, "mon": 0, "tues": 42 },
        "last3DaysPitches": 61,
        "last5DaysPitches": 86
      },
      {
        "playerName": "Abner Uribe",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 11, "mon": 9, "tues": 0 },
        "last3DaysPitches": 20,
        "last5DaysPitches": 20
      },
      {
        "playerName": "DL Hall",
        "pitchCounts": { "fri": 0, "sat": 30, "sun": 0, "mon": 16, "tues": 0 },
        "last3DaysPitches": 16,
        "last5DaysPitches": 46
      },
      {
        "playerName": "Nick Mears",
        "pitchCounts": { "fri": 24, "sat": 0, "sun": 0, "mon": 13, "tues": 0 },
        "last3DaysPitches": 13,
        "last5DaysPitches": 37
      },
      {
        "playerName": "Grant Anderson",
        "pitchCounts": { "fri": 13, "sat": 22, "sun": 0, "mon": 11, "tues": 0 },
        "last3DaysPitches": 11,
        "last5DaysPitches": 46
      },
      {
        "playerName": "Trevor Megill",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 8, "mon": 3, "tues": 0 },
        "last3DaysPitches": 11,
        "last5DaysPitches": 11
      },
      {
        "playerName": "Jared Koenig",
        "pitchCounts": { "fri": 0, "sat": 15, "sun": 0, "mon": 9, "tues": 0 },
        "last3DaysPitches": 9,
        "last5DaysPitches": 24
      }
    ],
    "Minnesota Twins": [
      {
        "playerName": "Jhoan Duran",
        "pitchCounts": { "fri": 6, "sat": 0, "sun": 17, "mon": 27, "tues": 0 },
        "last3DaysPitches": 44,
        "last5DaysPitches": 50
      },
      {
        "playerName": "Kody Funderburk",
        "pitchCounts": { "fri": 0, "sat": 39, "sun": 0, "mon": 0, "tues": 38 },
        "last3DaysPitches": 38,
        "last5DaysPitches": 77
      },
      {
        "playerName": "Michael Tonkin",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 0, "tues": 36 },
        "last3DaysPitches": 36,
        "last5DaysPitches": 36
      },
      {
        "playerName": "Cole Sands",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 27, "mon": 0, "tues": 8 },
        "last3DaysPitches": 35,
        "last5DaysPitches": 35
      },
      {
        "playerName": "Louis Varland",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 11, "mon": 0, "tues": 22 },
        "last3DaysPitches": 33,
        "last5DaysPitches": 33
      },
      {
        "playerName": "Brock Stewart",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 9, "mon": 16, "tues": 0 },
        "last3DaysPitches": 25,
        "last5DaysPitches": 25
      },
      {
        "playerName": "Danny Coulombe",
        "pitchCounts": { "fri": 11, "sat": 0, "sun": 20, "mon": 0, "tues": 0 },
        "last3DaysPitches": 20,
        "last5DaysPitches": 31
      },
      {
        "playerName": "Justin Topa",
        "pitchCounts": { "fri": 0, "sat": 27, "sun": 0, "mon": 16, "tues": 0 },
        "last3DaysPitches": 16,
        "last5DaysPitches": 43
      },
      {
        "playerName": "Griffin Jax",
        "pitchCounts": { "fri": 25, "sat": 0, "sun": 0, "mon": 13, "tues": 0 },
        "last3DaysPitches": 13,
        "last5DaysPitches": 38
      }
    ],
    "New York Mets": [
      {
        "playerName": "Jose Butto",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 19, "mon": 0, "tues": 38 },
        "last3DaysPitches": 57,
        "last5DaysPitches": 57
      },
      {
        "playerName": "Rico Garcia",
        "pitchCounts": { "fri": 21, "sat": 0, "sun": 0, "mon": 35, "tues": 0 },
        "last3DaysPitches": 35,
        "last5DaysPitches": 56
      },
      {
        "playerName": "Gregory Soto",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 15, "mon": 16, "tues": 0 },
        "last3DaysPitches": 31,
        "last5DaysPitches": 31
      },
      {
        "playerName": "Edwin Diaz",
        "pitchCounts": { "fri": 0, "sat": 14, "sun": 25, "mon": 0, "tues": 0 },
        "last3DaysPitches": 25,
        "last5DaysPitches": 39
      },
      {
        "playerName": "Chris Devenski",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 0, "tues": 23 },
        "last3DaysPitches": 23,
        "last5DaysPitches": 23
      },
      {
        "playerName": "Reed Garrett",
        "pitchCounts": { "fri": 0, "sat": 10, "sun": 18, "mon": 0, "tues": 0 },
        "last3DaysPitches": 18,
        "last5DaysPitches": 28
      },
      {
        "playerName": "Ryne Stanek",
        "pitchCounts": { "fri": 0, "sat": 12, "sun": 0, "mon": 12, "tues": 0 },
        "last3DaysPitches": 12,
        "last5DaysPitches": 24
      },
      {
        "playerName": "Brooks Raley",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 8, "mon": 0, "tues": 0 },
        "last3DaysPitches": 8,
        "last5DaysPitches": 8
      }
    ],
    "New York Yankees": [
      {
        "playerName": "Devin Williams",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 13, "mon": 0, "tues": 25 },
        "last3DaysPitches": 38,
        "last5DaysPitches": 38
      },
      {
        "playerName": "Luke Weaver",
        "pitchCounts": { "fri": 16, "sat": 0, "sun": 13, "mon": 16, "tues": 0 },
        "last3DaysPitches": 29,
        "last5DaysPitches": 45
      },
      {
        "playerName": "Tim Hill",
        "pitchCounts": { "fri": 18, "sat": 0, "sun": 12, "mon": 15, "tues": 0 },
        "last3DaysPitches": 27,
        "last5DaysPitches": 45
      },
      {
        "playerName": "Jonathan Loaisiga",
        "pitchCounts": { "fri": 0, "sat": 16, "sun": 12, "mon": 0, "tues": 11 },
        "last3DaysPitches": 23,
        "last5DaysPitches": 39
      },
      {
        "playerName": "Brent Headrick",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 17, "tues": 0 },
        "last3DaysPitches": 17,
        "last5DaysPitches": 17
      },
      {
        "playerName": "JT Brubaker",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 13, "tues": 0 },
        "last3DaysPitches": 13,
        "last5DaysPitches": 13
      },
      {
        "playerName": "Ian Hamilton",
        "pitchCounts": { "fri": 19, "sat": 0, "sun": 0, "mon": 9, "tues": 0 },
        "last3DaysPitches": 9,
        "last5DaysPitches": 28
      },
      {
        "playerName": "Yerry De Los Santos",
        "pitchCounts": { "fri": 0, "sat": 24, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 24
      }
    ],
    "Oakland Athletics": [
      {
        "playerName": "Michael Kelly",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 27, "tues": 23 },
        "last3DaysPitches": 50,
        "last5DaysPitches": 50
      },
      {
        "playerName": "Elvis Alvarado",
        "pitchCounts": { "fri": 32, "sat": 0, "sun": 0, "mon": 17, "tues": 19 },
        "last3DaysPitches": 36,
        "last5DaysPitches": 68
      },
      {
        "playerName": "Jack Perkins",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 35, "mon": 0, "tues": 0 },
        "last3DaysPitches": 35,
        "last5DaysPitches": 35
      },
      {
        "playerName": "Sean Newcomb",
        "pitchCounts": { "fri": 0, "sat": 20, "sun": 0, "mon": 10, "tues": 20 },
        "last3DaysPitches": 30,
        "last5DaysPitches": 50
      },
      {
        "playerName": "Ben Bowden",
        "pitchCounts": { "fri": 22, "sat": 0, "sun": 19, "mon": 0, "tues": 0 },
        "last3DaysPitches": 19,
        "last5DaysPitches": 41
      },
      {
        "playerName": "Justin Sterner",
        "pitchCounts": { "fri": 0, "sat": 19, "sun": 0, "mon": 7, "tues": 0 },
        "last3DaysPitches": 7,
        "last5DaysPitches": 26
      },
      {
        "playerName": "Mason Miller",
        "pitchCounts": { "fri": 0, "sat": 19, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 19
      }
    ],
    "Philadelphia Phillies": [
      {
        "playerName": "Seth Johnson",
        "pitchCounts": { "fri": 0, "sat": 13, "sun": 0, "mon": 24, "tues": 0 },
        "last3DaysPitches": 24,
        "last5DaysPitches": 37
      },
      {
        "playerName": "Tanner Banks",
        "pitchCounts": { "fri": 8, "sat": 0, "sun": 20, "mon": 0, "tues": 0 },
        "last3DaysPitches": 20,
        "last5DaysPitches": 28
      },
      {
        "playerName": "Daniel Robert",
        "pitchCounts": { "fri": 7, "sat": 20, "sun": 0, "mon": 0, "tues": 19 },
        "last3DaysPitches": 19,
        "last5DaysPitches": 46
      },
      {
        "playerName": "Matt Strahm",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 15, "mon": 0, "tues": 0 },
        "last3DaysPitches": 15,
        "last5DaysPitches": 15
      },
      {
        "playerName": "Jordan Romano",
        "pitchCounts": { "fri": 16, "sat": 0, "sun": 0, "mon": 0, "tues": 11 },
        "last3DaysPitches": 11,
        "last5DaysPitches": 27
      },
      {
        "playerName": "Max Lazar",
        "pitchCounts": { "fri": 0, "sat": 2, "sun": 0, "mon": 4, "tues": 0 },
        "last3DaysPitches": 4,
        "last5DaysPitches": 6
      },
      {
        "playerName": "Orion Kerkering",
        "pitchCounts": { "fri": 22, "sat": 0, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 22
      },
      {
        "playerName": "Alan Rangel",
        "pitchCounts": { "fri": 0, "sat": 29, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 29
      }
    ],
    "Pittsburgh Pirates": [
      {
        "playerName": "Carmen Mlodzinski",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 40, "mon": 0, "tues": 0 },
        "last3DaysPitches": 40,
        "last5DaysPitches": 40
      },
      {
        "playerName": "Braxton Ashcraft",
        "pitchCounts": { "fri": 24, "sat": 0, "sun": 0, "mon": 0, "tues": 38 },
        "last3DaysPitches": 38,
        "last5DaysPitches": 62
      },
      {
        "playerName": "Yohan Ramirez",
        "pitchCounts": { "fri": 0, "sat": 7, "sun": 0, "mon": 37, "tues": 0 },
        "last3DaysPitches": 37,
        "last5DaysPitches": 44
      },
      {
        "playerName": "David Bednar",
        "pitchCounts": { "fri": 7, "sat": 13, "sun": 0, "mon": 32, "tues": 0 },
        "last3DaysPitches": 32,
        "last5DaysPitches": 52
      },
      {
        "playerName": "Dennis Santana",
        "pitchCounts": { "fri": 25, "sat": 16, "sun": 0, "mon": 11, "tues": 12 },
        "last3DaysPitches": 23,
        "last5DaysPitches": 64
      },
      {
        "playerName": "Genesis Cabrera",
        "pitchCounts": { "fri": 0, "sat": 8, "sun": 0, "mon": 19, "tues": 0 },
        "last3DaysPitches": 19,
        "last5DaysPitches": 27
      },
      {
        "playerName": "Isaac Mattson",
        "pitchCounts": { "fri": 21, "sat": 0, "sun": 0, "mon": 14, "tues": 0 },
        "last3DaysPitches": 14,
        "last5DaysPitches": 35
      },
      {
        "playerName": "Caleb Ferguson",
        "pitchCounts": { "fri": 0, "sat": 13, "sun": 8, "mon": 0, "tues": 0 },
        "last3DaysPitches": 8,
        "last5DaysPitches": 21
      }
    ],
    "San Diego Padres": [
      {
        "playerName": "Ron Marinaccio",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 26, "mon": 0, "tues": 15 },
        "last3DaysPitches": 41,
        "last5DaysPitches": 41
      },
      {
        "playerName": "Adrian Morejon",
        "pitchCounts": { "fri": 0, "sat": 11, "sun": 0, "mon": 18, "tues": 9 },
        "last3DaysPitches": 27,
        "last5DaysPitches": 38
      },
      {
        "playerName": "Wandy Peralta",
        "pitchCounts": { "fri": 6, "sat": 0, "sun": 10, "mon": 0, "tues": 16 },
        "last3DaysPitches": 26,
        "last5DaysPitches": 32
      },
      {
        "playerName": "David Morgan",
        "pitchCounts": { "fri": 9, "sat": 0, "sun": 13, "mon": 4, "tues": 0 },
        "last3DaysPitches": 17,
        "last5DaysPitches": 26
      },
      {
        "playerName": "Robert Suarez",
        "pitchCounts": { "fri": 0, "sat": 17, "sun": 0, "mon": 16, "tues": 0 },
        "last3DaysPitches": 16,
        "last5DaysPitches": 33
      },
      {
        "playerName": "Yuki Matsui",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 0, "tues": 15 },
        "last3DaysPitches": 15,
        "last5DaysPitches": 15
      },
      {
        "playerName": "Jason Adam",
        "pitchCounts": { "fri": 0, "sat": 15, "sun": 0, "mon": 13, "tues": 0 },
        "last3DaysPitches": 13,
        "last5DaysPitches": 28
      },
      {
        "playerName": "Jeremiah Estrada",
        "pitchCounts": { "fri": 0, "sat": 20, "sun": 0, "mon": 1, "tues": 12 },
        "last3DaysPitches": 13,
        "last5DaysPitches": 33
      }
    ],
    "San Francisco Giants": [
      {
        "playerName": "Spencer Bivens",
        "pitchCounts": { "fri": 11, "sat": 0, "sun": 58, "mon": 0, "tues": 0 },
        "last3DaysPitches": 58,
        "last5DaysPitches": 69
      },
      {
        "playerName": "Carson Seymour",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 48, "tues": 0 },
        "last3DaysPitches": 48,
        "last5DaysPitches": 48
      },
      {
        "playerName": "Randy Rodriguez",
        "pitchCounts": { "fri": 0, "sat": 14, "sun": 25, "mon": 0, "tues": 0 },
        "last3DaysPitches": 25,
        "last5DaysPitches": 39
      },
      {
        "playerName": "Joey Lucchesi",
        "pitchCounts": { "fri": 0, "sat": 11, "sun": 17, "mon": 0, "tues": 7 },
        "last3DaysPitches": 24,
        "last5DaysPitches": 35
      },
      {
        "playerName": "Tristan Beck",
        "pitchCounts": { "fri": 30, "sat": 0, "sun": 12, "mon": 0, "tues": 9 },
        "last3DaysPitches": 21,
        "last5DaysPitches": 51
      },
      {
        "playerName": "Ryan Walker",
        "pitchCounts": { "fri": 0, "sat": 13, "sun": 0, "mon": 0, "tues": 21 },
        "last3DaysPitches": 21,
        "last5DaysPitches": 34
      },
      {
        "playerName": "Tyler Rogers",
        "pitchCounts": { "fri": 0, "sat": 15, "sun": 4, "mon": 0, "tues": 16 },
        "last3DaysPitches": 20,
        "last5DaysPitches": 35
      },
      {
        "playerName": "Camilo Doval",
        "pitchCounts": { "fri": 29, "sat": 0, "sun": 0, "mon": 16, "tues": 0 },
        "last3DaysPitches": 16,
        "last5DaysPitches": 45
      },
      {
        "playerName": "Matt Gage",
        "pitchCounts": { "fri": 11, "sat": 0, "sun": 10, "mon": 0, "tues": 0 },
        "last3DaysPitches": 10,
        "last5DaysPitches": 21
      }
    ],
    "Seattle Mariners": [
      {
        "playerName": "Jackson Kowar",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 17, "mon": 0, "tues": 16 },
        "last3DaysPitches": 33,
        "last5DaysPitches": 33
      },
      {
        "playerName": "Casey Legumina",
        "pitchCounts": { "fri": 15, "sat": 0, "sun": 30, "mon": 0, "tues": 0 },
        "last3DaysPitches": 30,
        "last5DaysPitches": 45
      },
      {
        "playerName": "Carlos Vargas",
        "pitchCounts": { "fri": 0, "sat": 5, "sun": 0, "mon": 0, "tues": 21 },
        "last3DaysPitches": 21,
        "last5DaysPitches": 26
      },
      {
        "playerName": "Gabe Speier",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 18, "tues": 0 },
        "last3DaysPitches": 18,
        "last5DaysPitches": 18
      },
      {
        "playerName": "Andres Munoz",
        "pitchCounts": { "fri": 16, "sat": 0, "sun": 0, "mon": 10, "tues": 0 },
        "last3DaysPitches": 10,
        "last5DaysPitches": 26
      },
      {
        "playerName": "Matt Brash",
        "pitchCounts": { "fri": 17, "sat": 0, "sun": 0, "mon": 8, "tues": 0 },
        "last3DaysPitches": 8,
        "last5DaysPitches": 25
      },
      {
        "playerName": "Eduard Bazardo",
        "pitchCounts": { "fri": 13, "sat": 0, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 13
      },
      {
        "playerName": "Trent Thornton",
        "pitchCounts": { "fri": 0, "sat": 21, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 21
      }
    ],
    "St. Louis Cardinals": [
      {
        "playerName": "Matt Svanson",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 24, "tues": 19 },
        "last3DaysPitches": 43,
        "last5DaysPitches": 43
      },
      {
        "playerName": "Steven Matz",
        "pitchCounts": { "fri": 11, "sat": 0, "sun": 0, "mon": 15, "tues": 24 },
        "last3DaysPitches": 39,
        "last5DaysPitches": 50
      },
      {
        "playerName": "John King",
        "pitchCounts": { "fri": 0, "sat": 1, "sun": 26, "mon": 0, "tues": 6 },
        "last3DaysPitches": 32,
        "last5DaysPitches": 33
      },
      {
        "playerName": "Kyle Leahy",
        "pitchCounts": { "fri": 0, "sat": 30, "sun": 0, "mon": 0, "tues": 3 },
        "last3DaysPitches": 3,
        "last5DaysPitches": 33
      },
      {
        "playerName": "Ryan Helsley",
        "pitchCounts": { "fri": 13, "sat": 0, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 13
      },
      {
        "playerName": "Phil Maton",
        "pitchCounts": { "fri": 9, "sat": 0, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 9
      },
      {
        "playerName": "JoJo Romero",
        "pitchCounts": { "fri": 9, "sat": 0, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 9
      },
      {
        "playerName": "Riley O'Brien",
        "pitchCounts": { "fri": 0, "sat": 15, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 15
      }
    ],
    "Tampa Bay Rays": [
      {
        "playerName": "Mason Montgomery",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 12, "mon": 0, "tues": 21 },
        "last3DaysPitches": 33,
        "last5DaysPitches": 33
      },
      {
        "playerName": "Ian Seymour",
        "pitchCounts": { "fri": 38, "sat": 0, "sun": 15, "mon": 0, "tues": 16 },
        "last3DaysPitches": 31,
        "last5DaysPitches": 69
      },
      {
        "playerName": "Edwin Uceta",
        "pitchCounts": { "fri": 21, "sat": 0, "sun": 0, "mon": 23, "tues": 0 },
        "last3DaysPitches": 23,
        "last5DaysPitches": 44
      },
      {
        "playerName": "Pete Fairbanks",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 19, "tues": 0 },
        "last3DaysPitches": 19,
        "last5DaysPitches": 19
      },
      {
        "playerName": "Mason Englert",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 10, "mon": 0, "tues": 7 },
        "last3DaysPitches": 17,
        "last5DaysPitches": 17
      },
      {
        "playerName": "Garrett Cleavinger",
        "pitchCounts": { "fri": 0, "sat": 18, "sun": 0, "mon": 12, "tues": 0 },
        "last3DaysPitches": 12,
        "last5DaysPitches": 30
      },
      {
        "playerName": "Kevin Kelly",
        "pitchCounts": { "fri": 0, "sat": 22, "sun": 0, "mon": 0, "tues": 12 },
        "last3DaysPitches": 12,
        "last5DaysPitches": 34
      },
      {
        "playerName": "Bryan Baker",
        "pitchCounts": { "fri": 0, "sat": 22, "sun": 0, "mon": 0, "tues": 9 },
        "last3DaysPitches": 9,
        "last5DaysPitches": 31
      }
    ],
    "Texas Rangers": [
      {
        "playerName": "Caleb Boushley",
        "pitchCounts": { "fri": 16, "sat": 0, "sun": 22, "mon": 0, "tues": 28 },
        "last3DaysPitches": 50,
        "last5DaysPitches": 66
      },
      {
        "playerName": "Jacob Webb",
        "pitchCounts": { "fri": 17, "sat": 0, "sun": 0, "mon": 36, "tues": 0 },
        "last3DaysPitches": 36,
        "last5DaysPitches": 53
      },
      {
        "playerName": "Cole Winn",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 19, "mon": 15, "tues": 0 },
        "last3DaysPitches": 34,
        "last5DaysPitches": 34
      },
      {
        "playerName": "Jon Gray",
        "pitchCounts": { "fri": 0, "sat": 29, "sun": 0, "mon": 0, "tues": 30 },
        "last3DaysPitches": 30,
        "last5DaysPitches": 59
      },
      {
        "playerName": "Shawn Armstrong",
        "pitchCounts": { "fri": 2, "sat": 35, "sun": 0, "mon": 0, "tues": 16 },
        "last3DaysPitches": 16,
        "last5DaysPitches": 53
      },
      {
        "playerName": "Hoby Milner",
        "pitchCounts": { "fri": 16, "sat": 0, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 16
      },
      {
        "playerName": "Jacob Latz",
        "pitchCounts": { "fri": 14, "sat": 20, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 34
      },
      {
        "playerName": "Robert Garcia",
        "pitchCounts": { "fri": 12, "sat": 0, "sun": 0, "mon": 0, "tues": 0 },
        "last3DaysPitches": 0,
        "last5DaysPitches": 12
      }
    ],
    "Toronto Blue Jays": [
      {
        "playerName": "Lazaro Estrada",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 0, "tues": 72 },
        "last3DaysPitches": 72,
        "last5DaysPitches": 72
      },
      {
        "playerName": "Brendon Little",
        "pitchCounts": { "fri": 13, "sat": 0, "sun": 0, "mon": 24, "tues": 0 },
        "last3DaysPitches": 24,
        "last5DaysPitches": 37
      },
      {
        "playerName": "Mason Fluharty",
        "pitchCounts": { "fri": 0, "sat": 13, "sun": 0, "mon": 24, "tues": 0 },
        "last3DaysPitches": 24,
        "last5DaysPitches": 37
      },
      {
        "playerName": "Seranthony Dominguez",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 11, "mon": 0, "tues": 12 },
        "last3DaysPitches": 23,
        "last5DaysPitches": 23
      },
      {
        "playerName": "Yariel Rodriguez",
        "pitchCounts": { "fri": 14, "sat": 0, "sun": 0, "mon": 0, "tues": 18 },
        "last3DaysPitches": 18,
        "last5DaysPitches": 32
      },
      {
        "playerName": "Tommy Nance",
        "pitchCounts": { "fri": 0, "sat": 19, "sun": 0, "mon": 17, "tues": 0 },
        "last3DaysPitches": 17,
        "last5DaysPitches": 36
      },
      {
        "playerName": "Jeff Hoffman",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 0, "tues": 17 },
        "last3DaysPitches": 17,
        "last5DaysPitches": 17
      },
      {
        "playerName": "Braydon Fisher",
        "pitchCounts": { "fri": 13, "sat": 11, "sun": 0, "mon": 11, "tues": 0 },
        "last3DaysPitches": 11,
        "last5DaysPitches": 35
      }
    ],
    "Washington Nationals": [
      {
        "playerName": "Andry Lara",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 0, "mon": 0, "tues": 32 },
        "last3DaysPitches": 32,
        "last5DaysPitches": 32
      },
      {
        "playerName": "Konnor Pilkington",
        "pitchCounts": { "fri": 2, "sat": 0, "sun": 13, "mon": 11, "tues": 0 },
        "last3DaysPitches": 24,
        "last5DaysPitches": 26
      },
      {
        "playerName": "Cole Henry",
        "pitchCounts": { "fri": 16, "sat": 0, "sun": 0, "mon": 0, "tues": 23 },
        "last3DaysPitches": 23,
        "last5DaysPitches": 39
      },
      {
        "playerName": "Kyle Finnegan",
        "pitchCounts": { "fri": 0, "sat": 0, "sun": 11, "mon": 10, "tues": 0 },
        "last3DaysPitches": 21,
        "last5DaysPitches": 21
      },
      {
        "playerName": "Andrew Chafin",
        "pitchCounts": { "fri": 0, "sat": 18, "sun": 0, "mon": 0, "tues": 16 },
        "last3DaysPitches": 16,
        "last5DaysPitches": 34
      },
      {
        "playerName": "Jackson Rutledge",
        "pitchCounts": { "fri": 0, "sat": 28, "sun": 0, "mon": 0, "tues": 16 },
        "last3DaysPitches": 16,
        "last5DaysPitches": 44
      },
      {
        "playerName": "Luis Garcia",
        "pitchCounts": { "fri": 9, "sat": 11, "sun": 0, "mon": 14, "tues": 0 },
        "last3DaysPitches": 14,
        "last5DaysPitches": 34
      },
      {
        "playerName": "Jose Ferrer",
        "pitchCounts": { "fri": 18, "sat": 0, "sun": 0, "mon": 13, "tues": 0 },
        "last3DaysPitches": 13,
        "last5DaysPitches": 31
      }
    ]
  }
}
