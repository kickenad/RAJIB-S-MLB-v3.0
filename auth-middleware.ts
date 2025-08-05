// src/lib/auth-middleware.ts
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase.config';
import { User } from 'firebase/auth';

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  invoiceId: string;
}

export async function checkUserSubscription(userId: string): Promise<{
  hasAccess: boolean;
  subscription: UserSubscription | null;
  daysRemaining?: number;
}> {
  try {
    const subDoc = await getDoc(doc(db, 'subscriptions', userId));
    
    if (!subDoc.exists()) {
      return { hasAccess: false, subscription: null };
    }

    const subscription = {
      ...subDoc.data(),
      startDate: subDoc.data().startDate.toDate(),
      endDate: subDoc.data().endDate.toDate(),
    } as UserSubscription;

    const now = new Date();
    const isActive = subscription.status === 'active' && subscription.endDate > now;
    
    if (!isActive) {
      // Update status to expired if past end date
      if (subscription.endDate <= now && subscription.status === 'active') {
        // You might want to update the status in Firestore here
        subscription.status = 'expired';
      }
      return { hasAccess: false, subscription };
    }

    const daysRemaining = Math.ceil((subscription.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      hasAccess: true,
      subscription,
      daysRemaining,
    };
  } catch (error) {
    console.error('Error checking subscription:', error);
    return { hasAccess: false, subscription: null };
  }
}

export async function requireSubscription(userId: string) {
  const result = await checkUserSubscription(userId);
  
  if (!result.hasAccess) {
    throw new Error('Active subscription required');
  }
  
  return result;
}