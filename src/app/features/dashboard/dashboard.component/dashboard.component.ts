import { Component, effect, inject, signal } from '@angular/core';
import { MortgageCalculatorComponent } from '../../../shared/components/mortgage-calculator.component/mortgage-calculator.component';
import { MarketTrendCardComponent } from '../../../shared/components/market-trend-card-component/market-trend-card.component';
import { LocationStateService } from '../../../core/state/location-state.service';
import { NeighborhoodScoreComponent } from '../../../shared/components/neighborhood-score.component/neighborhood-score.component';
import { NeighborhoodApi } from '../../../core/api/neighborhood.service';
import { MarketApi } from '../../../core/api/market.service';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  standalone: true,
  imports: [
    MortgageCalculatorComponent,
    MarketTrendCardComponent,
    NeighborhoodScoreComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  selector: 'app-dashboard'
})
export class DashboardComponent {
  locationState = inject(LocationStateService);
  location = this.locationState.location;
  trendData = this.locationState.location; // already populated earlier
  neighborhoodApi = inject(NeighborhoodApi);
  score = signal<any>(null);
  marketAnalytics = signal<any>(null);
  marketApi = inject(MarketApi);

  constructor(private meta: Meta, private title: Title) {
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


    this.title.setTitle('Dashboard | RealtyMind');
    this.meta.updateTag({
      name: 'description',
      content: 'Real estate insights, trends and property analytics'
    });
  }

}
