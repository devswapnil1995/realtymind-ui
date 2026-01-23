import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/ui/card.component/card.component';
import { SkeletonComponent } from '../../../../../../shared/ui/skeleton.component/skeleton.component';
import { MarketApiService } from '../../../../../../core/api/market-api.service';

@Component({
  selector: 'app-supply-demand',
  standalone: true,
  imports: [CommonModule, CardComponent, SkeletonComponent],
  templateUrl: './supply-demand.component.html',
  styleUrls: ['./supply-demand.component.scss']
})
export class SupplyDemandComponent implements OnInit {
  loading = signal(true);
  error = signal<string | null>(null);
  data = signal<any>(null);
  private marketApi = inject(MarketApiService);
  private readonly regionId = 'austin-tx';

  ngOnInit(): void {
    this.loadSupplyDemand();
  }

  private loadSupplyDemand(): void {
    this.loading.set(true);
    this.error.set(null);

    this.marketApi.getSupplyDemand(this.regionId).subscribe({
      next: (res: any) => {
        const supplyData = res.supply_demand || {
          activeListings: Math.round(Math.random() * 5000 + 2000),
          avgDaysOnMarket: Math.round(Math.random() * 60 + 20),
          listingsPerActiveAgent: Math.round(Math.random() * 10 + 5),
          supplyTrend: 'increasing'
        };
        this.data.set(supplyData);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Something went wrong while loading supply & demand');
        this.loading.set(false);
      }
    });
  }
}
