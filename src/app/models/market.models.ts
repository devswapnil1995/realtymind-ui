// CONTRACT FREEZE — Austin MVP v1
// Do NOT change existing fields without backend version bump

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors: string[];
  meta?: any;
}

/* ---------------- SNAPSHOT ---------------- */

export interface MarketSnapshotResponse {
  region: string;
  marketStatus: string;
  lastUpdated: string;
  metrics: {
    medianHomePrice: MetricValue;
    medianRent: MetricValue;
    inventoryMonths: MetricValue;
  };
}

export interface MetricValue {
  value: number;
  yoYChangePercent: number;
  source: string[];
}

/* ---------------- PRICE & RENT TRENDS ---------------- */

export interface PriceRentTrendsResponse {
  region: string;
  periodMonths: number;
  lastUpdated: string;
  series: {
    medianSalePrice: TimeSeriesPoint[];
    medianRent: TimeSeriesPoint[];
  };
}

export interface TimeSeriesPoint {
  month: string; // yyyy-MM
  value: number;
}

/* ---------------- HEAT INDEX ---------------- */

export interface HeatIndexResponse {
  region: string;
  score: number; // 0–100
  label: string;
  lastUpdated: string;
  contributors: {
    priceMomentum: number;
    inventoryPressure: number;
    migrationInflow: number;
    mortgageRateImpact: number;
  };
}

/* ---------------- SUPPLY vs DEMAND ---------------- */

export interface SupplyDemandResponse {
  region: string;
  lastUpdated: string;
  supply: {
    activeListings: number;
    newListings30Days: number;
    avgDaysOnMarket: number;
  };
  demand: {
    netMigration: number;
    jobGrowthRate: number;
    rentDemandIndex: number;
  };
}

/* ---------------- EXPLANATION ---------------- */

export interface MarketExplanationResponse {
  region: string;
  summary: string;
  facts: string[];
  lastUpdated: string;
}

/* ---------------- COMPARISON PREVIEW ---------------- */

export interface MarketComparisonPreviewResponse {
  region: string;
  comparison: {
    market: string;
    medianPrice: number;
  }[];
  locked: boolean;
}
