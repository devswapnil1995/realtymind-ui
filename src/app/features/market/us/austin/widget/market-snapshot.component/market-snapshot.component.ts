import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketApiService } from '../../../../../../core/api/market-api.service';
import { CardComponent } from '../../../../../../shared/ui/card.component/card.component';
import { SkeletonComponent } from '../../../../../../shared/ui/skeleton.component/skeleton.component';

@Component({
  selector: 'app-market-snapshot',
  standalone: true,
  imports: [CommonModule, CardComponent, SkeletonComponent],
  templateUrl: './market-snapshot.component.html',
  styleUrls: ['./market-snapshot.component.scss']
})
export class MarketSnapshotComponent implements OnInit {
  loading = signal(true);
  error = signal<string | null>(null);
  data = signal<any>(null);
  private marketApi = inject(MarketApiService);
  private readonly regionId = 'austin-tx';

  ngOnInit(): void {
    this.loadSnapshot();
  }

  private loadSnapshot(): void {
    this.loading.set(true);
    this.error.set(null);

    this.marketApi.getMarketSnapshot(this.regionId).subscribe({
      next: (res: any) => {
        const fallbackData = {
          medianPrice: 525000,
          medianRent: 1850,
          inventoryMonths: 2.1
        };
        const displayData = {
          medianPrice: res.medianPrice || fallbackData.medianPrice,
          medianRent: res.medianRent || fallbackData.medianRent,
          inventoryMonths: res.inventoryMonths || fallbackData.inventoryMonths
        };
        this.data.set(displayData);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load market snapshot');
        this.loading.set(false);
      }
    });
  }
}

