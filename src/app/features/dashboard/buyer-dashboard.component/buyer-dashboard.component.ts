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

@Component({
  standalone: true,
  imports: [CardComponent, SkeletonComponent, ErrorBannerComponent, MarketTrendCardComponent, NeighborhoodScoreComponent, MortgageCalculatorComponent],
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.scss']
})
export class BuyerDashboardComponent implements OnInit {

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

  constructor() {
    effect(() => {
      console.log('Location changed:', this.location());

      const loc = this.location();
      if (!loc) return;

      if (loc?.lat !== undefined && loc?.lng !== undefined) {
        this.neighborhoodApi
          .getScore(loc.lat, loc.lng)
          .subscribe(res => this.score.set(res));

        this.marketApi
          .getAnalytics(loc.city, loc.locality)
          .subscribe(res => this.marketAnalytics.set(res));
      }


    });
  }

  ngOnInit() {
    this.api.getBuyerDashboard()
      .subscribe(res => this.data.set(res));
  }
}
