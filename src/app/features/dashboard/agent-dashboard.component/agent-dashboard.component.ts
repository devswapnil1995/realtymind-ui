import { Component, signal, OnInit, inject, effect } from '@angular/core';
import { LocationStateService } from '../../../core/state/location-state.service';
import { MarketApi } from '../../../core/api/market.service';
import { CardComponent } from '../../../shared/ui/card.component/card.component';
import { SkeletonComponent } from '../../../shared/ui/skeleton.component/skeleton.component';
import { ErrorBannerComponent } from '../../../shared/ui/error-banner.component/error-banner.component';
import { MarketTrendCardComponent } from '../../../shared/components/market-trend-card-component/market-trend-card.component';

@Component({
  standalone: true,
  imports: [
    CardComponent,
    SkeletonComponent,
    ErrorBannerComponent,
    MarketTrendCardComponent
  ],
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.scss']
})
export class AgentDashboardComponent implements OnInit {
  loading = signal(false);
  error = signal('');
  locationState = inject(LocationStateService);
  location = this.locationState.location;
  marketAnalytics = signal<any>(null);
  marketApi = inject(MarketApi);

  // Agent-specific metrics
  areaOverview = signal<any>(null);

  constructor() {
    effect(() => {
      const loc = this.location();
      if (!loc) return;

      // Load market analytics for agent's area
      if (loc?.city) {
        this.loadMarketData(loc.city, loc.locality || 'all');
      }
    });
  }

  ngOnInit() {
    // Initial load if location already exists
    const loc = this.location();
    if (loc?.city) {
      this.loadMarketData(loc.city, loc.locality || 'all');
    }
  }

  private loadMarketData(city: string, locality: string = 'all') {
    this.loading.set(true);
    this.error.set('');

    const targetLocality = locality?.trim() || 'all';

    this.marketApi.getAnalytics(city, targetLocality)
      .subscribe({
        next: (data) => {
          this.marketAnalytics.set(data);
          this.areaOverview.set({
            city,
            locality: targetLocality,
            demand: 'High', // Placeholder - would come from API
            competition: 'Medium', // Placeholder
            avgListingTime: '45 days' // Placeholder
          });
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load market data');
          this.loading.set(false);
        }
      });
  }
}
