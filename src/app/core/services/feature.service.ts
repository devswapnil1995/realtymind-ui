import { Injectable, inject, computed } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export type FeatureKey = 
  | 'MarketTrendsBasic'
  | 'PriceHistoryChart'
  | 'NeighborhoodScore'
  | 'POILivability'
  | 'MortgageCalculator'
  | 'UnlimitedSearches'
  | 'SaveProperties';

/**
 * Feature service to check user access to features based on role and plan
 * 
 * Role Mapping:
 * 1 = Buyer
 * 2 = Agent  
 * 3 = Admin
 */
@Injectable({ providedIn: 'root' })
export class FeatureService {
  private auth = inject(AuthService);

  /**
   * Feature matrix for Buyers:
   * Free plan: Only basic market trends
   * Pro plan: All features
   */
  private readonly buyerFeatures: Record<'Free' | 'Pro', FeatureKey[]> = {
    Free: ['MarketTrendsBasic'],
    Pro: [
      'MarketTrendsBasic',
      'PriceHistoryChart',
      'NeighborhoodScore',
      'POILivability',
      'MortgageCalculator',
      'UnlimitedSearches',
      'SaveProperties'
    ]
  };

  /**
   * Check if current user has access to a specific feature
   * 
   * Rules:
   * - Buyer: Based on plan (Free vs Pro)
   * - Agent: All features (uses Agent plan, no Free/Pro)
   * - Admin: All features (no plan restrictions)
   */
  hasFeature(featureKey: FeatureKey): boolean {
    const role = this.auth.role();
    const subscription = this.auth.subscription();

    // Admin has access to everything
    if (role === 3) {
      return true;
    }

    // Agent has access to all features (no plan restrictions)
    if (role === 2) {
      return true;
    }

    // Buyer: check plan-based access
    if (role === 1) {
      const plan = subscription.plan;
      
      // If plan is Agent, treat as Pro (edge case)
      if (plan === 'Agent') {
        return true;
      }

      const allowedFeatures = this.buyerFeatures[plan] || this.buyerFeatures.Free;
      return allowedFeatures.includes(featureKey);
    }

    // Not authenticated or unknown role
    return false;
  }

  /**
   * Computed signal that returns whether user is on Free plan
   * Useful for showing upgrade CTAs
   */
  isFreePlan = computed(() => {
    const role = this.auth.role();
    const subscription = this.auth.subscription();
    return role === 1 && subscription.plan === 'Free';
  });

  /**
   * Computed signal that returns whether user is a Buyer
   */
  isBuyer = computed(() => this.auth.role() === 1);

  /**
   * Computed signal that returns whether user is an Agent
   */
  isAgent = computed(() => this.auth.role() === 2);

  /**
   * Computed signal that returns whether user is an Admin
   */
  isAdmin = computed(() => this.auth.role() === 3);

  /**
   * Get user's current plan
   */
  getCurrentPlan = computed(() => this.auth.subscription().plan);
}
