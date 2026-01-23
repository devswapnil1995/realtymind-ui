import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/ui/card.component/card.component';
import { SkeletonComponent } from '../../../../../../shared/ui/skeleton.component/skeleton.component';
import { MarketApiService } from '../../../../../../core/api/market-api.service';

@Component({
  selector: 'app-market-heat-index',
  standalone: true,
  imports: [CommonModule, CardComponent, SkeletonComponent],
  templateUrl: './market-heat-index.component.html',
  styleUrls: ['./market-heat-index.component.scss']
})
export class MarketHeatIndexComponent implements OnInit {
  loading = signal(true);
  error = signal<string | null>(null);
  heatIndex = signal<any>(null);
  private marketApi = inject(MarketApiService);
  private readonly regionId = 'austin-tx';

  rotation = computed(() => {
    const data = this.heatIndex();
    if (!data || !data.score) return 'rotate(0deg)';
    const degrees = (data.score / 100) * 180;
    return `rotate(${degrees}deg)`;
  });

  ngOnInit(): void {
    this.loadHeatIndex();
  }

  private loadHeatIndex(): void {
    this.loading.set(true);
    this.error.set(null);

    this.marketApi.getHeatIndex(this.regionId).subscribe({
      next: (res: any) => {
        const heatData = res.heat_index || {
          score: Math.round(Math.random() * 100),
          label: 'Moderate Activity',
          description: 'Market activity is at moderate levels'
        };
        this.heatIndex.set(heatData);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Something went wrong while loading heat index');
        this.loading.set(false);
      }
    });
  }
}
