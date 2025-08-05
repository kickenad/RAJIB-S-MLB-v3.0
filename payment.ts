// src/types/payment.ts
export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    duration: number; // in days
    features: string[];
    popular?: boolean;
  }
  
  export interface PaymentInvoice {
    id: string;
    userId: string;
    planId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'confirming' | 'confirmed' | 'failed' | 'refunded';
    nowPaymentsId?: string;
    paymentUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    paidAt?: Date;
  }
  
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
  
  export interface NOWPaymentsCreateInvoice {
    price_amount: number;
    price_currency: string;
    order_id: string;
    order_description: string;
    ipn_callback_url: string;
    success_url: string;
    cancel_url: string;
    customer_email?: string;
  }
  
  export interface NOWPaymentsInvoiceResponse {
    id: string;
    token_id: string;
    order_id: string;
    order_description: string;
    price_amount: string;
    price_currency: string;
    pay_currency: string;
    ipn_callback_url: string;
    invoice_url: string;
    success_url: string;
    cancel_url: string;
    created_at: string;
    updated_at: string;
    payment_status: string;
    pay_amount: string;
    actually_paid: string;
    outcome_amount: string;
    outcome_currency: string;
  }
  
  export interface NOWPaymentsWebhook {
    payment_id: string;
    payment_status: string;
    pay_address: string;
    price_amount: number;
    price_currency: string;
    pay_amount: number;
    actually_paid: number;
    pay_currency: string;
    order_id: string;
    order_description: string;
    purchase_id: string;
    outcome_amount: number;
    outcome_currency: string;
  }
  
  export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    {
      id: 'weekly',
      name: 'Weekly Access',
      price: 99,
      duration: 7,
      features: [
        'Full MLB Analysis',
        'Trap Detection',
        'Market Signals (18 Markets)',
        'Final Picks Generation',
        'Email Support'
      ]
    },
    {
      id: 'monthly',
      name: 'Monthly Access',
      price: 299,
      duration: 30,
      features: [
        'Everything in Weekly',
        'Priority Analysis',
        'Advanced Risk Management',
        'Historical Performance Data',
        'Phone Support'
      ],
      popular: true
    },
    {
      id: 'yearly',
      name: 'Yearly Access',
      price: 1999,
      duration: 365,
      features: [
        'Everything in Monthly',
        'Custom Analysis Requests',
        '1-on-1 Strategy Sessions',
        'Early Access to New Features',
        'VIP Support Channel'
      ]
    }
  ];