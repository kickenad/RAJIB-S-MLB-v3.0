// src/lib/trapDetectionService.ts
import type { CoversGameOdds } from './coversScraperService';

interface BettingData {
  gameId: string;
  market: string;
  odds: {
    current: number;
    opening: number;
    movement: 'up' | 'down' | 'stable';
  };
  volume: {
    betCount: number;
    dollarAmount: number;
    publicPercentage: number;
  };
  timestamp: Date;
}

interface TrapSignal {
  gameId: string;
  market: string;
  trapScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high';
  reasons: Array<{
    factor: string;
    severity: 'minor' | 'moderate' | 'major';
    description: string;
    points: number;
  }>;
  recommendation: 'AVOID' | 'CAUTION' | 'PROCEED';
}

export class AlternativeTrapDetector {
  private static instance: AlternativeTrapDetector;

  static getInstance(): AlternativeTrapDetector {
    if (!AlternativeTrapDetector.instance) {
      AlternativeTrapDetector.instance = new AlternativeTrapDetector();
    }
    return AlternativeTrapDetector.instance;
  }

  /**
   * Method 1: The Odds API Integration (Most Reliable)
   * Uses multiple sportsbooks to detect line discrepancies
   */
  async detectTrapsUsingOddsAPI(gameId: string): Promise<TrapSignal> {
    try {
      // Get odds from multiple sportsbooks
      const oddsData = await this.fetchOddsFromAPI(gameId);
      const trapReasons: TrapSignal['reasons'] = [];
      let trapScore = 0;

      // 1. Line Discrepancy Detection
      const lineDiscrepancy = this.calculateLineDiscrepancy(oddsData);
      if (lineDiscrepancy.severity > 0.1) {
        trapReasons.push({
          factor: 'Line Discrepancy',
          severity: lineDiscrepancy.severity > 0.2 ? 'major' : 'moderate',
          description: `${lineDiscrepancy.percentage}% difference between books`,
          points: lineDiscrepancy.severity * 30
        });
        trapScore += lineDiscrepancy.severity * 30;
      }

      // 2. Reverse Line Movement Detection
      const rlm = this.detectReverseLineMovement(oddsData);
      if (rlm.detected) {
        trapReasons.push({
          factor: 'Reverse Line Movement',
          severity: 'major',
          description: `Line moved ${rlm.direction} despite ${rlm.publicSide}% public money`,
          points: 25
        });
        trapScore += 25;
      }

      // 3. Sharp Book vs Square Book Analysis
      const sharpSquareDiv = this.analyzeSharpSquareDivergence(oddsData);
      if (sharpSquareDiv.divergence > 0.05) {
        trapReasons.push({
          factor: 'Sharp vs Square Divergence',
          severity: 'moderate',
          description: `Sharp books favor ${sharpSquareDiv.sharpSide}`,
          points: 20
        });
        trapScore += 20;
      }

      return {
        gameId,
        market: 'Match Winner', // Adjust based on actual market
        trapScore: Math.min(trapScore, 100),
        riskLevel: this.calculateRiskLevel(trapScore),
        reasons: trapReasons,
        recommendation: this.getRecommendation(trapScore)
      };

    } catch (error) {
      console.error('Error in odds API trap detection:', error);
      return this.getDefaultTrapSignal(gameId);
    }
  }

  /**
   * Method 2: Pattern-Based Trap Detection (No External APIs)
   * Uses internal data patterns and historical trends
   */
  async detectTrapsUsingPatterns(gameData: any, signalData: any): Promise<TrapSignal> {
    const trapReasons: TrapSignal['reasons'] = [];
    let trapScore = 0;

    // 1. Popular Team Bias Detection
    const popularTeamBias = this.detectPopularTeamBias(gameData);
    if (popularTeamBias.detected) {
      trapReasons.push({
        factor: 'Popular Team Bias',
        severity: 'moderate',
        description: `Public likely overvaluing ${popularTeamBias.team}`,
        points: 15
      });
      trapScore += 15;
    }

    // 2. Injury Mismatch Detection
    const injuryMismatch = this.detectInjuryMismatch(gameData, signalData);
    if (injuryMismatch.detected) {
      trapReasons.push({
        factor: 'Hidden Injury Impact',
        severity: 'major',
        description: injuryMismatch.description,
        points: 20
      });
      trapScore += 20;
    }

    // 3. Weather Mismatch Detection
    const weatherMismatch = this.detectWeatherMismatch(gameData, signalData);
    if (weatherMismatch.detected) {
      trapReasons.push({
        factor: 'Weather Impact Overlooked',
        severity: 'moderate',
        description: weatherMismatch.description,
        points: 15
      });
      trapScore += 15;
    }

    // 4. Pitcher Fatigue Pattern
    const pitcherFatigue = this.detectPitcherFatiguePattern(gameData);
    if (pitcherFatigue.detected) {
      trapReasons.push({
        factor: 'Pitcher Fatigue Pattern',
        severity: 'moderate',
        description: pitcherFatigue.description,
        points: 12
      });
      trapScore += 12;
    }

    // 5. Historical Trap Pattern
    const historicalTrap = await this.detectHistoricalTrapPattern(gameData);
    if (historicalTrap.detected) {
      trapReasons.push({
        factor: 'Historical Trap Pattern',
        severity: 'minor',
        description: historicalTrap.description,
        points: 10
      });
      trapScore += 10;
    }

    return {
      gameId: gameData.id,
      market: 'Match Winner',
      trapScore: Math.min(trapScore, 100),
      riskLevel: this.calculateRiskLevel(trapScore),
      reasons: trapReasons,
      recommendation: this.getRecommendation(trapScore)
    };
  }

  /**
   * Method 3: Composite Trap Score (Combines Multiple Methods)
   */
  async generateCompositeTrapScore(gameData: any, signalData: any): Promise<TrapSignal> {
    const [oddsTraps, patternTraps] = await Promise.all([
      this.detectTrapsUsingOddsAPI(gameData.id).catch(() => this.getDefaultTrapSignal(gameData.id)),
      this.detectTrapsUsingPatterns(gameData, signalData)
    ]);

    // Combine scores with weights
    const compositeScore = Math.round(
      (oddsTraps.trapScore * 0.6) + (patternTraps.trapScore * 0.4)
    );

    // Combine reasons
    const allReasons = [...oddsTraps.reasons, ...patternTraps.reasons]
      .sort((a, b) => b.points - a.points)
      .slice(0, 5); // Top 5 reasons

    return {
      gameId: gameData.id,
      market: 'Match Winner',
      trapScore: compositeScore,
      riskLevel: this.calculateRiskLevel(compositeScore),
      reasons: allReasons,
      recommendation: this.getRecommendation(compositeScore)
    };
  }

  // Supporting Methods
  private async fetchOddsFromAPI(gameId: string): Promise<any> {
    try {
      // Use The Odds API (free tier available)
      const response = await fetch(
        `https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?apiKey=${process.env.ODDS_API_KEY}&regions=us&markets=h2h&oddsFormat=american`
      );
      
      if (!response.ok) {
        throw new Error(`Odds API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching odds:', error);
      return null;
    }
  }

  private calculateLineDiscrepancy(oddsData: any): { severity: number; percentage: number } {
    if (!oddsData || !oddsData.bookmakers || oddsData.bookmakers.length < 2) {
      return { severity: 0, percentage: 0 };
    }

    const odds = oddsData.bookmakers.map((book: any) => book.markets[0].outcomes[0].price);
    const max = Math.max(...odds);
    const min = Math.min(...odds);
    const percentage = ((max - min) / min) * 100;

    return {
      severity: percentage / 100, // Normalize to 0-1
      percentage: Math.round(percentage * 10) / 10
    };
  }

  private detectReverseLineMovement(oddsData: any): { detected: boolean; direction: string; publicSide: number } {
    // Mock implementation - replace with real logic
    const mockPublicPercentage = Math.random() * 100;
    const mockLineMovement = Math.random() > 0.7;
    
    return {
      detected: mockLineMovement && mockPublicPercentage > 65,
      direction: 'against public',
      publicSide: Math.round(mockPublicPercentage)
    };
  }

  private analyzeSharpSquareDivergence(oddsData: any): { divergence: number; sharpSide: string } {
    // Pinnacle (sharp) vs DraftKings (square) comparison
    const sharpBooks = ['pinnacle', 'betfair'];
    const squareBooks = ['draftkings', 'fanduel'];
    
    // Mock implementation
    return {
      divergence: Math.random() * 0.1,
      sharpSide: Math.random() > 0.5 ? 'home' : 'away'
    };
  }

  private detectPopularTeamBias(gameData: any): { detected: boolean; team: string } {
    const popularTeams = ['Yankees', 'Dodgers', 'Red Sox', 'Cubs', 'Cardinals'];
    const homeTeam = gameData.teams?.home?.name || '';
    const awayTeam = gameData.teams?.away?.name || '';
    
    const hasPopularTeam = popularTeams.some(team => 
      homeTeam.includes(team) || awayTeam.includes(team)
    );

    return {
      detected: hasPopularTeam,
      team: popularTeams.find(team => homeTeam.includes(team) || awayTeam.includes(team)) || ''
    };
  }

  private detectInjuryMismatch(gameData: any, signalData: any): { detected: boolean; description: string } {
    const injuries = gameData.injuries || [];
    const keyInjuries = injuries.filter((inj: any) => inj.impact === 'high');
    
    if (keyInjuries.length > 0 && signalData.confidence > 75) {
      return {
        detected: true,
        description: `High confidence despite ${keyInjuries[0].player} injury`
      };
    }

    return { detected: false, description: '' };
  }

  private detectWeatherMismatch(gameData: any, signalData: any): { detected: boolean; description: string } {
    const weather = gameData.weather;
    if (!weather) return { detected: false, description: '' };

    // Check for extreme weather conditions
    if (weather.wind_speed > 20 || weather.temperature < 45 || weather.temperature > 95) {
      return {
        detected: true,
        description: `Extreme weather conditions: ${weather.wind_speed}mph wind, ${weather.temperature}°F`
      };
    }

    return { detected: false, description: '' };
  }

  private detectPitcherFatiguePattern(gameData: any): { detected: boolean; description: string } {
    const homePitcher = gameData.pitchers?.home;
    const awayPitcher = gameData.pitchers?.away;
    
    // Mock fatigue detection - replace with real logic
    const mockFatigue = Math.random() > 0.8;
    
    if (mockFatigue) {
      return {
        detected: true,
        description: 'Starting pitcher on short rest or high workload'
      };
    }

    return { detected: false, description: '' };
  }

  private async detectHistoricalTrapPattern(gameData: any): Promise<{ detected: boolean; description: string }> {
    // Check historical data for similar trap patterns
    // This would query your historical trap data
    
    return {
      detected: Math.random() > 0.9, // Mock: 10% chance
      description: 'Similar matchup was a trap 3/5 times historically'
    };
  }

  private calculateRiskLevel(score: number): 'low' | 'medium' | 'high' {
    if (score >= 60) return 'high';
    if (score >= 30) return 'medium';
    return 'low';
  }

  private getRecommendation(score: number): 'AVOID' | 'CAUTION' | 'PROCEED' {
    if (score >= 70) return 'AVOID';
    if (score >= 40) return 'CAUTION';
    return 'PROCEED';
  }

  private getDefaultTrapSignal(gameId: string): TrapSignal {
    return {
      gameId,
      market: 'Match Winner',
      trapScore: 0,
      riskLevel: 'low',
      reasons: [],
      recommendation: 'PROCEED'
    };
  }
}
