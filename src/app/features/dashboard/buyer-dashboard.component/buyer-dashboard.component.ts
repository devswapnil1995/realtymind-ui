import { Component, signal, OnInit, inject, effect } from '@angular/core';
import { DashboardApi } from '../../../core/api/dashboard.api';
import { ErrorBannerComponent } from '../../../shared/ui/error-banner.component/error-banner.component';
import { EmptyStateComponent } from '../../../shared/ui/empty-state.component/empty-state.component';
import { SkeletonComponent } from '../../../shared/ui/skeleton.component/skeleton.component';
import { CardComponent } from '../../../shared/ui/card.component/card.component';
import { MarketTrendCardComponent } from '../../../shared/components/market-trend-card-component/market-trend-card.component';
import { MarketTrendChartComponent } from '../../../shared/components/market-trend-chart.component/market-trend-chart.component';
import { NeighborhoodScoreComponent } from '../../../shared/components/neighborhood-score.component/neighborhood-score.component';
import { MortgageCalculatorComponent } from '../../../shared/components/mortgage-calculator.component/mortgage-calculator.component';
import { LocationStateService } from '../../../core/state/location-state.service';
import { NeighborhoodApi } from '../../../core/api/neighborhood.service';
import { MarketApi } from '../../../core/api/market.service';
import { HasFeatureDirective } from '../../../shared/directives/has-feature.directive';
import { UpgradeCtaComponent } from '../../../shared/components/upgrade-cta.component/upgrade-cta.component';
import { FeatureService } from '../../../core/services/feature.service';

@Component({
  standalone: true,
  imports: [
    CardComponent, 
    SkeletonComponent, 
    ErrorBannerComponent, 
    EmptyStateComponent,
    MarketTrendCardComponent, 
    NeighborhoodScoreComponent, 
    MortgageCalculatorComponent,
    HasFeatureDirective,
    UpgradeCtaComponent
  ],
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.scss']
})
export class BuyerDashboardComponent implements OnInit {
  loading = signal(false);
  loadingAnalytics = signal(false);
  loadingScore = signal(false);
  data = signal<any>(null);
  error = signal('');
  private api = inject(DashboardApi);
  locationState = inject(LocationStateService);
  location = this.locationState.location;
  trendData = this.locationState.location; // already populated earlier
  neighborhoodApi = inject(NeighborhoodApi);
  score = signal<any>(null);
  marketAnalytics = signal<any>(null);
  marketApi = inject(MarketApi);
  featureService = inject(FeatureService);

  constructor() {
    effect(() => {
      console.log('Location changed:', this.location());

      const loc = this.location();
      if (!loc) return;

      if (loc?.lat !== undefined && loc?.lng !== undefined) {
        // Neighborhood score is Pro-only; avoid calling backend when not allowed
        if (this.featureService.hasFeature('NeighborhoodScore')) {
          this.loadingScore.set(true);
          this.neighborhoodApi
            .getScore(loc.lat, loc.lng)
            .subscribe({
              next: res => this.score.set(res),
              error: () => this.error.set('Failed to load neighborhood score'),
              complete: () => this.loadingScore.set(false)
            });
        } else {
          this.score.set(null);
        }

        // Price history / advanced analytics are Pro-only; avoid calling backend when not allowed
        if (this.featureService.hasFeature('PriceHistoryChart')) {
          this.loadingAnalytics.set(true);
          this.marketApi
            .getAnalytics(loc.city, loc.locality)
            .subscribe({
              next: res => this.marketAnalytics.set(res),
              error: () => this.error.set('Failed to load market analytics'),
              complete: () => this.loadingAnalytics.set(false)
            });
        } else {
          this.marketAnalytics.set(null);
        }
      }


    });
  }

  ngOnInit() {
    this.loading.set(true);
    this.api.getBuyerDashboard()
      .subscribe({
        next: res => {
          this.data.set(res);
        },
        error: () => {
          this.error.set('Unable to load dashboard. Please try again.');
        },
        complete: () => this.loading.set(false)
      });
  }

  onPlaceSelected(place: any) {
    console.log('Selected place:', place);
  }
}
