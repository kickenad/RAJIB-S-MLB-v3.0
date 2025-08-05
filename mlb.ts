// src/lib/mlb.ts
import axios from 'axios';
import { isToday } from 'date-fns';

export interface MlbPlayer {
  id: number;
  fullName: string;
  primaryPosition?: { 
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  }
}

export interface MlbTeam {
    id: number;
    name: string;
    league: { id: number; name: string };
    division: { id: number; name: string };
}


export interface MlbTeamRoster {
    roster: {
        person: MlbPlayer;
        jerseyNumber: string;
        position: { code: string; name: string; type: string; abbreviation: string; };
        status: { code: string; description: string; };
    }[];
}


export interface MlbGame {
  gamePk: number;
  gameDate: string;
  status: {
    abstractGameState: string;
    detailedState: string;
  };
  teams: {
    away: {
      team: { id: number; name: string };
      probablePitcher?: { id: number; fullName: string };
    };
    home: {
      team: { id: number; name: string };
      probablePitcher?: { id: number; fullName: string };
    };
  };
  venue: {
    name: string;
  };
  linescore?: {
    teams: {
      away: { runs?: number };
      home: { runs?: number };
    };
  };
}


// --- Server-side Cache for MLB data ---
interface Cache<T> {
  data: T | null;
  lastFetched: Date | null;
}

const gamesCache: Cache<MlbGame[]> = { data: null, lastFetched: null };
const allTeamsCache: Cache<MlbTeam[]> = { data: null, lastFetched: null };
const allPlayersCache: Cache<MlbPlayer[]> = { data: null, lastFetched: null };
const playerCache = new Map<number, Cache<MlbPlayer>>();
const rosterCache = new Map<number, Cache<MlbTeamRoster['roster']>>();

const isCacheValid = (cache: Cache<any>): boolean => {
  return cache.data !== null && cache.lastFetched !== null && isToday(cache.lastFetched);
};


export async function getGamesForDate(date: string): Promise<MlbGame[]> {
  if (isCacheValid(gamesCache)) {
    console.log(`Serving MLB games for ${date} from cache.`);
    return gamesCache.data!;
  }

  try {
    console.log(`Fetching fresh MLB games for ${date}.`);
    const response = await axios.get(
      `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=${date}&hydrate=probablePitcher,linescore,team`
    );
    
    const games = response.data.dates.length > 0 ? response.data.dates[0].games : [];
    
    gamesCache.data = games;
    gamesCache.lastFetched = new Date();

    return games;
  } catch (error) {
    console.error('Error fetching MLB games:', error);
    return [];
  }
}

export async function getTeamRoster(teamId: number): Promise<MlbTeamRoster['roster']> {
    const cachedEntry = rosterCache.get(teamId);
    if (cachedEntry && isCacheValid(cachedEntry)) {
        console.log(`Serving roster for team ${teamId} from cache.`);
        return cachedEntry.data!;
    }

    try {
        console.log(`Fetching fresh roster for team ${teamId}.`);
        // Expanded hydrate to include person(primaryPosition) which is more reliable
        const response = await axios.get(
            `https://statsapi.mlb.com/api/v1/teams/${teamId}/roster?rosterType=active&hydrate=person(primaryPosition)`
        );
        
        const roster = response.data.roster;
        rosterCache.set(teamId, { data: roster, lastFetched: new Date() });

        return roster;
    } catch (error) {
        console.error(`Error fetching roster for team ${teamId}:`, error);
        return [];
    }
}

export async function getAllTeams(): Promise<MlbTeam[]> {
    if (isCacheValid(allTeamsCache)) {
        console.log('Serving all teams from cache.');
        return allTeamsCache.data!;
    }
    try {
        console.log('Fetching fresh all teams data.');
        const response = await axios.get(`https://statsapi.mlb.com/api/v1/teams?sportId=1`);
        const teams = response.data.teams;
        allTeamsCache.data = teams;
        allTeamsCache.lastFetched = new Date();
        return teams;
    } catch (error) {
        console.error('Error fetching all teams:', error);
        return [];
    }
}

export async function getTeam(teamId: number): Promise<MlbTeam | null> {
    const teams = await getAllTeams();
    return teams.find(t => t.id === teamId) || null;
}

export async function getAllPlayers(): Promise<MlbPlayer[]> {
     if (isCacheValid(allPlayersCache)) {
        console.log('Serving all players from cache.');
        return allPlayersCache.data!;
    }
    try {
        console.log('Fetching fresh all players data.');
        const currentYear = new Date().getFullYear();
        const response = await axios.get(`https://statsapi.mlb.com/api/v1/sports/1/players?season=${currentYear}`);
        const players = response.data.people;
        allPlayersCache.data = players;
        allPlayersCache.lastFetched = new Date();
        return players;
    } catch (error) {
        console.error('Error fetching all players:', error);
        return [];
    }
}

export async function getPlayer(playerId: number): Promise<MlbPlayer | null> {
    const cachedEntry = playerCache.get(playerId);
     if (cachedEntry && isCacheValid(cachedEntry)) {
        console.log(`Serving player ${playerId} from cache.`);
        return cachedEntry.data!;
    }
    try {
         console.log(`Fetching fresh player data for ${playerId}.`);
        const response = await axios.get(`https://statsapi.mlb.com/api/v1/people/${playerId}`);
        const player = response.data.people[0];
        playerCache.set(playerId, { data: player, lastFetched: new Date() });
        return player;
    } catch (error) {
        console.error(`Error fetching player ${playerId}:`, error);
        return null;
    }
}
