import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../shared/ui/card.component/card.component';

@Component({
  selector: 'app-austin-market-index-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <ui-card>
      <div class="austin-market-index">
        <div class="header">
          <h2>Austin Market Index</h2>
          <span class="metro-label">Austin–Round Rock–Georgetown, TX (Metro)</span>
        </div>

        <div class="index-value" *ngIf="indexData">
          <div class="value-display">
            <span class="number">{{ indexData.index_value | number:'1.1-1' }}</span>
            <span class="unit">Index Value</span>
          </div>
          <div class="change">
            <span 
              class="change-pct"
              [class.positive]="indexData.change_percentage >= 0"
              [class.negative]="indexData.change_percentage < 0">
              {{ (indexData.change_percentage >= 0 ? '+' : '') }}{{ indexData.change_percentage | number:'1.1-1' }}%
            </span>
            <span class="timeframe">{{ indexData.timeframe }}</span>
          </div>
        </div>

        <div class="data-source">
          <span class="source-label">Source: Zillow Home Value Index</span>
          <span class="date" *ngIf="indexData">Last updated: {{ indexData.last_updated | date:'MMM d, yyyy' }}</span>
        </div>

        <div *ngIf="!indexData" class="in-development">
          <p>📊 Data loading...</p>
        </div>
      </div>
    </ui-card>
  `,
  styles: [`
    .austin-market-index {
      padding: 1.5rem;
    }

    .header {
      margin-bottom: 1.5rem;
    }

    h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
      color: #1a1a1a;
    }

    .metro-label {
      display: block;
      font-size: 0.875rem;
      color: #666;
      margin-top: 0.25rem;
    }

    .index-value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      background: linear-gradient(135deg, #f5f5f5 0%, #e9e9e9 100%);
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .value-display {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .number {
      font-size: 2rem;
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1;
    }

    .unit {
      font-size: 0.875rem;
      color: #666;
      margin-top: 0.25rem;
    }

    .change {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .change-pct {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .change-pct.positive {
      color: #28a745;
    }

    .change-pct.negative {
      color: #dc3545;
    }

    .timeframe {
      font-size: 0.875rem;
      color: #666;
    }

    .data-source {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
      font-size: 0.875rem;
      color: #666;
    }

    .source-label {
      font-weight: 500;
    }

    .in-development {
      padding: 1rem;
      text-align: center;
      color: #999;
    }
  `]
})
export class AustinMarketIndexCardComponent {
  @Input() indexData: any;
}
