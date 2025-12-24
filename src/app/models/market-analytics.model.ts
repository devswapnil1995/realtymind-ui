export interface MarketAnalytics {
  city: string;
  locality: string;
  currentPrice: number;
  growth: {
    oneYear: number;
    threeYear: number;
  };
  cityAveragePrice: number;
  comparisonPercent: number;
  history: { period: string; price: number }[];
}
