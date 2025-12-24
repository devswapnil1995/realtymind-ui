import { Component, effect, inject, signal } from '@angular/core';
import { AddressAutocompleteComponent } from '../../shared/components/address-autocomplete.component/address-autocomplete.component';
import { LocationStateService } from '../../core/state/location-state.service';
import { NeighborhoodApi } from '../../core/api/neighborhood.service';
import { MarketTrendChartComponent } from '../../shared/components/market-trend-chart.component/market-trend-chart.component';
import { MarketApi } from '../../core/api/market.service';
import { MortgageCalculatorComponent } from '../../shared/components/mortgage-calculator.component/mortgage-calculator.component';
import { DashboardComponent } from './dashboard.component/dashboard.component';
@Component({
  standalone: true,
  imports: [AddressAutocompleteComponent, DashboardComponent],
  template: `
    <h2>Dashboard</h2>

    <app-address-autocomplete
      (placeSelected)="onPlaceSelected($event)">
    </app-address-autocomplete>


      <app-dashboard></app-dashboard>

  `
})
export class Dashboard {
  private locationState = inject(LocationStateService);
  location = this.locationState.location;
  private neighborhoodApi = inject(NeighborhoodApi);
  private marketApi = inject(MarketApi);
  score = signal<any>(null);
  trendData = signal<any>(null);

  constructor() {
    effect(() => {
      console.log('Location changed:', this.location());

      const loc = this.location();
      if (!loc) return;

      if (loc?.lat !== undefined && loc?.lng !== undefined) {
        this.neighborhoodApi
          .getScore(loc.lat, loc.lng)
          .subscribe(res => this.score.set(res));
      }

      // TEMP logic: city/locality split
      console.log('Fetching market trend for:', loc.address);

      const parts = loc.address.split(',');
      const city = parts[parts.length - 2]?.trim() ?? '';
      const locality = parts[0];

      this.marketApi
        .getTrend(loc.city, loc.locality)
        .subscribe(res => {
          this.trendData.set({
            labels: res.points.map((x: any) => x.period),
            values: res.points.map((x: any) => x.avgPricePerSqFt)
          });
        });
    });
  }

  onPlaceSelected(place: any) {
    console.log('Selected place:', place);
  }
}
