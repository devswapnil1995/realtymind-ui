import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../shared/ui/card.component/card.component';

@Component({
  selector: 'app-market-signals-panel',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <ui-card>
      <div class="market-signals">
        <h3>Market Signals</h3>
        
        <div *ngIf="signals && signals.length > 0" class="signals-list">
          <div *ngFor="let signal of signals" class="signal-item" [class]="signal.status">
            <div class="signal-indicator" [class]="signal.status"></div>
            <div class="signal-content">
              <span class="signal-name">{{ signal.name }}</span>
              <span class="signal-value">{{ signal.value }}</span>
            </div>
          </div>
        </div>

        <div *ngIf="!signals || signals.length === 0" class="in-development">
          <p>🚧 In Development</p>
          <p class="hint">Market signal analysis coming soon</p>
        </div>

        <div class="data-note">
          <p>Source: Zillow Home Value Index</p>
        </div>
      </div>
    </ui-card>
  `,
  styles: [`
    .market-signals {
      padding: 1.5rem;
    }

    h3 {
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
      color: #1a1a1a;
    }

    .signals-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .signal-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border-radius: 6px;
      background: #f9f9f9;
    }

    .signal-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-top: 3px;
      flex-shrink: 0;
    }

    .signal-indicator.bullish {
      background: #28a745;
    }

    .signal-indicator.bearish {
      background: #dc3545;
    }

    .signal-indicator.neutral {
      background: #ffc107;
    }

    .signal-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      flex: 1;
    }

    .signal-name {
      font-weight: 500;
      color: #1a1a1a;
      font-size: 0.95rem;
    }

    .signal-value {
      font-size: 0.875rem;
      color: #666;
    }

    .in-development {
      padding: 2rem;
      text-align: center;
      color: #999;
      background: #f9f9f9;
      border-radius: 6px;
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
      margin: 0;
    }
  `]
})
export class MarketSignalsPanelComponent {
  @Input() signals: any[] | null = null;
}
