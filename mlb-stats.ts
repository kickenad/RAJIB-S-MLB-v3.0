// src/lib/mlb-stats.ts
import axios from 'axios';
import { MlbPlayer, getAllPlayers, getPlayer, getTeams } from './mlb';

// --- TYPE DEFINITIONS ---
export interface PitcherStats {
  wins?: number;
  losses?: number;
  era?: string;
  whip?: string;
  inningsPitched?: string;
  strikeouts?: number;
  baseOnBalls?: number;
  strikeoutWalkRatio?: string;
  strikeoutsPer9Inn?: string;
  hitsPer9Inn?: string;
  homeRunsPer9?: string;
}

export interface HittingStats {
    gamesPlayed?: number;
    groundOuts?: number;
    airOuts?: number;
    runs?: number;
    doubles?: number;
    triples?: number;
    homeRuns?: number;
    strikeOuts?: number;
    baseOnBalls?: number;
    intentionalWalks?: number;
    hits?: number;
    hitByPitch?: number;
    avg?: string;
    atBats?: number;
    obp?: string;
    slg?: string;
    ops?: string;
    caughtStealing?: number;
    stolenBases?: number;
    stolenBasePercentage?: string;
    groundIntoDoublePlay?: number;
    plateAppearances?: number;
    totalBases?: number;
    rbi?: number;
    leftOnBase?: number;
    sacBunts?: number;
    sacFlies?: number;
    babip?: string;
    atBatsPerHomeRun?: string;
}

export interface PlayerPitchingStats extends PitcherStats {
  playerId: number;
  playerName: string;
  teamName: string;
}

export interface PlayerHittingStats extends HittingStats {
  playerId: number;
  playerName: string;
  teamName: string;
}


interface MlbStatSplit<T> {
  season: string;
  stat: T;
  player?: { id: number; fullName: string; };
  team?: { id: number; name: string; };
}

interface MlbPersonStats<T> {
  splits: MlbStatSplit<T>[];
}

interface MlbApiStatLeaders {
    leagueLeaders: {
        leaders: {
            rank: number;
            value: string;
            team: { id: number, name: string };
            person: { id: number, fullName: string };
        }[];
    }[];
}

export interface PlayerStatLeader {
    rank: number;
    value: string;
    team: { id: number, name: string };
    person: { id: number, fullName: string };
}

export interface PlayerVsPlayerStats extends HittingStats {
  batter: MlbPlayer | null;
  pitcher: MlbPlayer | null;
}


// --- SERVER-SIDE CACHE ---
interface Cache<T> {
  data: T | null;
  lastFetched: number | null; // Store timestamp
}

const pitcherStatsCache = new Map<number, Cache<PitcherStats>>();
const batterStatsCache = new Map<number, Cache<HittingStats>>();
const allHittingStatsCache: Cache<PlayerHittingStats[]> = { data: null, lastFetched: null };
const allPitchingStatsCache: Cache<PlayerPitchingStats[]> = { data: null, lastFetched: null };
const statLeadersCache = new Map<string, Cache<PlayerStatLeader[]>>();

const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours in milliseconds


// --- SERVER-SIDE FETCH FUNCTIONS ---

export async function fetchPitcherStats(pitcherId: number | undefined): Promise<PitcherStats | null> {
  if (!pitcherId) return null;

  const cachedEntry = pitcherStatsCache.get(pitcherId);
  if (cachedEntry && cachedEntry.lastFetched && (Date.now() - cachedEntry.lastFetched < CACHE_TTL)) {
    return cachedEntry.data;
  }
  
  const currentYear = new Date().getFullYear();
  const statsUrl = `https://statsapi.mlb.com/api/v1/people/${pitcherId}/stats?stats=season&group=pitching&season=${currentYear}`;

  try {
    const response = await axios.get<{ stats: MlbPersonStats<PitcherStats>[] }>(statsUrl);
    const statsData = response.data.stats;

    if (!statsData || statsData.length === 0 || statsData[0].splits.length === 0) {
      return null;
    }

    const seasonStats = statsData[0].splits[0].stat;
    
    pitcherStatsCache.set(pitcherId, { data: seasonStats, lastFetched: Date.now() });

    return seasonStats;
  } catch (error) {
    // API returns 404 if player has no stats, which is not an error for us.
    if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
    }
    console.error(`An error occurred fetching stats for pitcher ${pitcherId}:`, error);
    return null; // Return null on error to avoid breaking the page
  }
}

export async function fetchBatterStats(playerId: number | undefined): Promise<HittingStats | null> {
  if (!playerId) return null;

  const cachedEntry = batterStatsCache.get(playerId);
  if (cachedEntry && cachedEntry.lastFetched && (Date.now() - cachedEntry.lastFetched < CACHE_TTL)) {
    return cachedEntry.data;
  }
  
  const currentYear = new Date().getFullYear();
  const statsUrl = `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&group=hitting&season=${currentYear}`;

  try {
    const response = await axios.get<{ stats: MlbPersonStats<HittingStats>[] }>(statsUrl);
    const statsData = response.data.stats;

    if (!statsData || statsData.length === 0 || statsData[0].splits.length === 0) {
      return null;
    }

    const seasonStats = statsData[0].splits[0].stat;
    
    batterStatsCache.set(playerId, { data: seasonStats, lastFetched: Date.now() });

    return seasonStats;
  } catch (error) {
     if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
    }
    console.error(`An error occurred fetching hitting stats for player ${playerId}:`, error);
    return null;
  }
}

export async function fetchAllPlayerHittingStats(): Promise<PlayerHittingStats[]> {
    if (allHittingStatsCache.data && allHittingStatsCache.lastFetched && (Date.now() - allHittingStatsCache.lastFetched < CACHE_TTL)) {
        return allHittingStatsCache.data;
    }

    const currentYear = new Date().getFullYear();
    const statsUrl = `https://statsapi.mlb.com/api/v1/stats?stats=season&group=hitting&season=${currentYear}&sportId=1&limit=1000`;
    try {
        const response = await axios.get<{ stats: MlbPersonStats<HittingStats>[] }>(statsUrl);
        if (!response.data.stats || response.data.stats.length === 0) return [];

        const allStats: PlayerHittingStats[] = response.data.stats[0].splits.map(split => ({
            ...split.stat,
            playerId: split.player!.id,
            playerName: split.player!.fullName,
            teamName: split.team!.name
        }));
        allHittingStatsCache.data = allStats;
        allHittingStatsCache.lastFetched = Date.now();
        return allStats;
    } catch (error) {
        console.error('Failed to fetch all player hitting stats:', error);
        return [];
    }
}

export async function fetchAllPlayerPitchingStats(): Promise<PlayerPitchingStats[]> {
     if (allPitchingStatsCache.data && allPitchingStatsCache.lastFetched && (Date.now() - allPitchingStatsCache.lastFetched < CACHE_TTL)) {
        return allPitchingStatsCache.data;
    }

    const currentYear = new Date().getFullYear();
    const statsUrl = `https://statsapi.mlb.com/api/v1/stats?stats=season&group=pitching&season=${currentYear}&sportId=1&limit=1000`;
    try {
        const response = await axios.get<{ stats: MlbPersonStats<PitcherStats>[] }>(statsUrl);
        if (!response.data.stats || response.data.stats.length === 0) return [];

        const allStats: PlayerPitchingStats[] = response.data.stats[0].splits.map(split => ({
            ...split.stat,
            playerId: split.player!.id,
            playerName: split.player!.fullName,
            teamName: split.team!.name,
        }));
         allPitchingStatsCache.data = allStats;
        allPitchingStatsCache.lastFetched = Date.now();
        return allStats;
    } catch (error) {
        console.error('Failed to fetch all player pitching stats:', error);
        return [];
    }
}

export async function fetchStatLeaders(stat: 'homeRuns' | 'runsBattedIn' | 'battingAverage'): Promise<PlayerStatLeader[]> {
    const cachedEntry = statLeadersCache.get(stat);
    if (cachedEntry && cachedEntry.data && cachedEntry.lastFetched && (Date.now() - cachedEntry.lastFetched < CACHE_TTL)) {
        return cachedEntry.data;
    }

    const currentYear = new Date().getFullYear();
    const url = `https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=${stat}&season=${currentYear}&limit=50`;

    try {
        const response = await axios.get<MlbApiStatLeaders>(url);
        if (response.data.leagueLeaders && response.data.leagueLeaders.length > 0) {
            const leaders = response.data.leagueLeaders[0].leaders;
            statLeadersCache.set(stat, { data: leaders, lastFetched: Date.now() });
            return leaders;
        }
        return [];
    } catch (error) {
        console.error(`Failed to fetch leaders for stat "${stat}":`, error);
        return [];
    }
}

export async function fetchPlayerVsPlayerStats(batterName: string, pitcherName: string): Promise<PlayerVsPlayerStats | null> {
    const allPlayers = await getAllPlayers();

    const findId = (name: string) => {
        const player = allPlayers.find(p => p.fullName.toLowerCase() === name.toLowerCase());
        return player?.id;
    }
    
    const batterId = findId(batterName);
    const pitcherId = findId(pitcherName);

    if (!batterId) throw new Error(`Batter "${batterName}" not found.`);
    if (!pitcherId) throw new Error(`Pitcher "${pitcherName}" not found.`);

    const batter = await getPlayer(batterId);
    const pitcher = await getPlayer(pitcherId);

    const currentYear = new Date().getFullYear();
    const statsUrl = `https://statsapi.mlb.com/api/v1/people/${batterId}/stats?stats=vsPlayer&group=hitting&season=${currentYear}&opposingPlayerId=${pitcherId}`;

    try {
        const response = await axios.get<{ stats: MlbPersonStats<HittingStats>[] }>(statsUrl);
        const statsData = response.data.stats;
        
        if (!statsData || statsData.length === 0 || statsData[0].splits.length === 0) {
            return {
                batter,
                pitcher
            };
        }

        const seasonStats = statsData[0].splits[0].stat;
        return {
            ...seasonStats,
            batter,
            pitcher,
        };
    } catch (error) {
         if (axios.isAxiosError(error) && error.response?.status === 404) {
            return { batter, pitcher }; // No stats found, return players info
        }
        console.error(`An error occurred fetching H2H stats for ${batterId} vs ${pitcherId}:`, error);
        throw new Error('Failed to fetch head-to-head stats.');
    }
}
