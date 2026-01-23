import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../../../shared/ui/skeleton.component/skeleton.component';
import { ErrorBannerComponent } from '../../../../shared/ui/error-banner.component/error-banner.component';
import { AustinMarketIndexCardComponent } from './components/austin-market-index-card.component';
import { MarketSignalsPanelComponent } from './components/market-signals-panel.component';
import { RiskContextPanelComponent } from './components/risk-context-panel.component';
import { DataSourceFooterComponent } from './components/data-source-footer.component';
import { MarketApi } from '../../../../core/api/market.service';
import { MarketSnapshotComponent } from './widget/market-snapshot.component/market-snapshot.component';
import { PriceRentTrendsComponent } from './widget/price-rent-trends.component/price-rent-trends.component';
import { MarketHeatIndexComponent } from './widget/market-heat-index.component/market-heat-index.component';
import { SupplyDemandComponent } from './widget/supply-demand.component/supply-demand.component';
import { ExplanationComponent } from './widget/explanation.component/explanation.component';
import { ComparisonPreviewComponent } from './widget/comparison-preview.component/comparison-preview.component';

@Component({
    selector: 'app-austin-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        SkeletonComponent,
        ErrorBannerComponent,
        AustinMarketIndexCardComponent,
        MarketSignalsPanelComponent,
        RiskContextPanelComponent,
        DataSourceFooterComponent,
        MarketSnapshotComponent,
        PriceRentTrendsComponent,
        MarketHeatIndexComponent,
        SupplyDemandComponent,
        ExplanationComponent,
        ComparisonPreviewComponent
    ],
    template: `
   <div class="austin-dashboard">

  <div class="widget-section">
    <app-market-snapshot></app-market-snapshot>
  </div>

  <div class="widget-section">
    <app-price-rent-trends></app-price-rent-trends>
  </div>

  <div class="widget-section">
    <app-market-heat-index></app-market-heat-index>
  </div>

  <div class="widget-section">
    <app-supply-demand></app-supply-demand>
  </div>

  <div class="widget-section">
    <app-explanation></app-explanation>
  </div>

  <div class="widget-section">
    <app-comparison-preview></app-comparison-preview>
  </div>

  <div class="widget-section">
    <app-data-source-footer></app-data-source-footer>
  </div>

</div>
  `,
    styles: [`
    .austin-dashboard {
      padding: 2rem 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      margin: 0 0 0.5rem 0;
      font-size: 2rem;
      color: #1a1a1a;
      font-weight: 700;
    }

    .subtitle {
      margin: 0;
      font-size: 1rem;
      color: #666;
    }

    .error-section {
      margin-bottom: 2rem;
    }

    .loading-state {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .dashboard-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    @media (max-width: 768px) {
      .austin-dashboard {
        padding: 1rem;
      }

      .dashboard-header h1 {
        font-size: 1.5rem;
      }

      .subtitle {
        font-size: 0.95rem;
      }

      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }

    .widget-section {
  margin-top: 1.5rem;
}

  `]
})
export class AustinDashboardComponent implements OnInit {
    private marketApi = inject(MarketApi);

    loading = signal(true);
    error = signal('');
    indexData = signal<any>(null);
    marketSignals = signal<any[]>([]);
    riskContext = signal<any>(null);

    ngOnInit() {
        this.loadAustinIndex();
    }

    private loadAustinIndex() {
        this.loading.set(true);
        this.error.set('');

        this.marketApi.getAustinIndex().subscribe({
            next: (data: any) => {
                this.indexData.set(data);
                this.extractSignalsAndRisk(data);
                this.loading.set(false);
            },
            error: (err: any) => {
                console.error('Failed to load Austin index:', err);
                this.error.set('Failed to load Austin Market Index. Please try again later.');
                this.loading.set(false);
            }
        });
    }

    private extractSignalsAndRisk(data: any) {
        // Extract market signals from the data if available
        if (data.signals) {
            this.marketSignals.set(data.signals);
        }

        // Extract risk context from the data if available
        if (data.risk_context) {
            this.riskContext.set(data.risk_context);
        }
    }
}
