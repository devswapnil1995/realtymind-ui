import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-market-trend-card',
  imports: [],
  templateUrl: './market-trend-card.component.html',
  styleUrl: './market-trend-card.component.scss',
})
export class MarketTrendCardComponent {
  @Input() data!: any;

  get trendColor() {
    return this.data.trendDirection === 'Rising' ? 'green' : 'red';
  }
}
