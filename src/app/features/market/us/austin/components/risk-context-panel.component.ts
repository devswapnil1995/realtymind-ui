import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../shared/ui/card.component/card.component';

@Component({
  selector: 'app-risk-context-panel',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <ui-card>
      <div class="risk-context">
        <h3>Market Context</h3>
        
        <div *ngIf="riskData" class="risk-metrics">
          <div class="metric">
            <span class="metric-label">Volatility</span>
            <div class="metric-bar">
              <div class="bar-fill" [style.width.%]="riskData.volatility"></div>
            </div>
            <span class="metric-value">{{ riskData.volatility }}%</span>
          </div>

          <div class="metric">
            <span class="metric-label">Market Sentiment</span>
            <div class="sentiment-indicator" [class]="riskData.sentiment">
              {{ riskData.sentiment }}
            </div>
          </div>
        </div>

        <div *ngIf="!riskData" class="in-development">
          <p>🚧 In Development</p>
          <p class="hint">Risk and context metrics coming soon</p>
        </div>

        <div class="data-note">
          <p>Source: Zillow Home Value Index &amp; Market Analysis</p>
          <p class="disclaimer">Analysis based on historical metro-level data</p>
        </div>
      </div>
    </ui-card>
  `,
  styles: [`
    .risk-context {
      padding: 1.5rem;
    }

    h3 {
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
      color: #1a1a1a;
    }

    .risk-metrics {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .metric {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .metric-label {
      font-weight: 500;
      color: #1a1a1a;
      font-size: 0.95rem;
    }

    .metric-bar {
      width: 100%;
      height: 24px;
      background: #e9e9e9;
      border-radius: 4px;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #28a745 0%, #ffc107 50%, #dc3545 100%);
      transition: width 0.3s ease;
    }

    .metric-value {
      font-size: 0.875rem;
      color: #666;
      text-align: right;
    }

    .sentiment-indicator {
      padding: 0.75rem;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
      font-size: 0.95rem;
    }

    .sentiment-indicator.bullish {
      background: #d4edda;
      color: #155724;
    }

    .sentiment-indicator.bearish {
      background: #f8d7da;
      color: #721c24;
    }

    .sentiment-indicator.neutral {
      background: #e2e3e5;
      color: #383d41;
    }

    .in-development {
      padding: 2rem;
      text-align: center;
      color: #999;
      background: #f9f9f9;
      border-radius: 6px;
      margin-bottom: 1.5rem;
    }

    .in-development p {
      margin: 0;
    }

    .in-development p:first-child {
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .hint {
      font-size: 0.875rem;
    }

    .data-note {
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
      font-size: 0.875rem;
      color: #666;
    }

    .data-note p {
      margin: 0.25rem 0;
    }

    .disclaimer {
      font-size: 0.8rem;
      color: #999;
      font-style: italic;
    }
  `]
})
export class RiskContextPanelComponent {
  @Input() riskData: any;
}
