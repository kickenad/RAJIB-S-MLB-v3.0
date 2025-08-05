// src/lib/Data-management.ts
import { db, auth } from './firebaseadmin'; // FIXED: Changed dbAdmin to db
import * as admin from 'firebase-admin'; // Keep this for admin.firestore.FieldPath
import { Timestamp } from 'firebase-admin/firestore';
import { addDays, format } from 'date-fns';

if (!db) { // FIXED: Changed dbAdmin to db
  console.warn('Firebase Admin SDK not initialized. DataManager will not function on the server.');
}

// Types for your data structure
export interface DailyGameData {
  date: string;
  games: any[]; // Using any for simplicity, can be typed with MlbGame
  odds: any[];
  pitcherStats: Record<string, any>;
  bullpenData: Record<string, any>;
  weather: Record<string, any>;
  injuries: Record<string, any>;
}

export interface GameAnalysisResult {
  gamePk: number;
  date: string;
  analysis: {
    isTrap: boolean;
    confidence: number;
    recommendation: string;
    actualOutcome?: 'WIN' | 'LOSS' | 'PENDING';
    accuracy?: number;
  };
  gameData: Partial<DailyGameData>; // It might not have all daily data
}

export interface LearningData {
  totalAnalyses: number;
  correctPredictions: number;
  accuracy: number;
  patterns: {
    successfulTrapDetections: GameAnalysisResult[];
    failedPredictions: GameAnalysisResult[];
    commonFactors: string[];
  };
  lastUpdated: Timestamp;
}

export class DataManager {
  private readonly DAILY_DATA_COLLECTION = 'dailyGameData';
  private readonly LEARNING_DATA_DOC = 'aiLearning/main';
  private readonly ANALYSIS_RESULTS_COLLECTION = 'analysisResults';

  // This private getter is now simplified and directly uses the imported 'db'
  private get db() {
    if (!db) { // FIXED: Changed dbAdmin to db
      throw new Error("Firebase Admin SDK is not available. This operation can only be performed on the server.");
    }
    return db; // FIXED: Changed dbAdmin to db
  }

  // Store daily game data
  async storeDailyGameData(date: string, data: DailyGameData): Promise<void> {
    try {
      const docRef = this.db.collection(this.DAILY_DATA_COLLECTION).doc(date);
      await docRef.set(data, { merge: true });
      console.log(`Stored daily game data for ${date} in Firestore.`);
    } catch (error) {
      console.error('Failed to store daily game data:', error);
    }
  }

  // Retrieve daily game data
  async getDailyGameData(date: string): Promise<DailyGameData | null> {
    try {
      const docRef = this.db.collection(this.DAILY_DATA_COLLECTION).doc(date);
      const doc = await docRef.get();
      if (!doc.exists) {
        return null;
      }
      return doc.data() as DailyGameData;
    } catch (error) {
      console.error('Failed to retrieve daily game data:', error);
      return null;
    }
  }

  // Store analysis results for learning
  async storeAnalysisResult(result: GameAnalysisResult): Promise<void> {
    try {
      const docRef = this.db.collection(this.ANALYSIS_RESULTS_COLLECTION).doc(`${result.date}_${result.gamePk}`);
      await docRef.set(result, { merge: true });
      await this.updateLearningData(result);
      console.log(`Stored analysis result for game ${result.gamePk}`);
    } catch (error) {
      console.error('Failed to store analysis result:', error);
    }
  }

  // Update AI learning data
  private async updateLearningData(newResult: GameAnalysisResult): Promise<void> {
    const docRef = this.db.doc(this.LEARNING_DATA_DOC);
    await this.db.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);
      let learningData: LearningData;

      if (!doc.exists) {
        learningData = {
          totalAnalyses: 0,
          correctPredictions: 0,
          accuracy: 0,
          patterns: {
            successfulTrapDetections: [],
            failedPredictions: [],
            commonFactors: [],
          },
          lastUpdated: Timestamp.now(),
        };
      } else {
        learningData = doc.data() as LearningData;
      }

      learningData.totalAnalyses++;
      learningData.lastUpdated = Timestamp.now();

      if (newResult.analysis.actualOutcome && newResult.analysis.actualOutcome !== 'PENDING') {
        const wasCorrect = this.evaluatePredictionAccuracy(newResult);
        
        if (wasCorrect) {
          learningData.correctPredictions++;
          // Keep a list of the last 20 successful detections for pattern analysis
          learningData.patterns.successfulTrapDetections = [newResult, ...learningData.patterns.successfulTrapDetections].slice(0, 20);
        } else {
          // Keep a list of the last 20 failed predictions
          learningData.patterns.failedPredictions = [newResult, ...learningData.patterns.failedPredictions].slice(0, 20);
        }
        
        learningData.accuracy = (learningData.correctPredictions / learningData.totalAnalyses) * 100;
      }
      
      transaction.set(docRef, learningData, { merge: true });
    });
  }

  // Get AI learning data
  async getLearningData(): Promise<LearningData | null> {
    try {
      const docRef = this.db.doc(this.LEARNING_DATA_DOC);
      const doc = await docRef.get();
      if (!doc.exists) {
          return null;
      }
      return doc.data() as LearningData;
    } catch (error) {
      console.error('Failed to retrieve learning data:', error);
      return null;
    }
  }

  // Clean up old daily data (but keep analysis and learning data)
  async cleanupOldDailyData(daysToKeep: number = 7): Promise<void> {
    const cutoffDate = addDays(new Date(), -daysToKeep);
    const cutoffDateStr = format(cutoffDate, 'yyyy-MM-dd');

    const collectionRef = this.db.collection(this.DAILY_DATA_COLLECTION);
    // FIXED: Changed admin.firestore to the imported admin object
    const snapshot = await collectionRef.where(admin.firestore.FieldPath.documentId(), '<', cutoffDateStr).get();

    if (snapshot.empty) {
        console.log("No old daily game data to delete.");
        return;
    }

    const batch = this.db.batch();
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Cleaned up ${snapshot.size} old daily data documents.`);
  }

  private evaluatePredictionAccuracy(result: GameAnalysisResult): boolean {
    if (result.analysis.isTrap && result.analysis.actualOutcome === 'WIN') {
      return true;
    }
    if (!result.analysis.isTrap && result.analysis.actualOutcome === 'LOSS') {
        return true;
    }
    return false;
  }

  async getHistoricalPatterns(): Promise<string> {
    const learningData = await this.getLearningData();
    if (!learningData) {
      return "No historical analysis data available.";
    }

    const patterns = [
      `Total analyses performed: ${learningData.totalAnalyses}`,
      `Overall accuracy: ${learningData.accuracy.toFixed(1)}%`,
    ];
    
    if (learningData.patterns.successfulTrapDetections.length > 0) {
      const successFactors = learningData.patterns.successfulTrapDetections
        .slice(0, 5) // Get the 5 most recent
        .map(r => r.analysis); 
      
      patterns.push("\n--- Recent Successful Detections ---");
      successFactors.forEach((factor, i) => {
        patterns.push(`${i+1}. Recommendation: ${factor.recommendation} (Confidence: ${factor.confidence}%) -> Outcome: ${factor.actualOutcome}`);
      });
    }
    
    if (learningData.patterns.failedPredictions.length > 0) {
        const failureFactors = learningData.patterns.failedPredictions
            .slice(0, 5) // Get the 5 most recent
            .map(r => r.analysis);
            
        patterns.push("\n--- Recent Failed Predictions (Lessons Learned) ---");
        failureFactors.forEach((factor, i) => {
            patterns.push(`${i+1}. Recommendation: ${factor.recommendation} (Confidence: ${factor.confidence}%) -> Outcome: ${factor.actualOutcome}`);
        });
    }

    return patterns.join('\n');
  }
}

export const dataManager = new DataManager();