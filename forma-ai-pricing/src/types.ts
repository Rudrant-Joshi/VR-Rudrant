export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearlyMonthlyEquivalent: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface UserSubscription {
  planId: string;
  billingCycle: 'monthly' | 'yearly';
  email: string;
  name: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}
