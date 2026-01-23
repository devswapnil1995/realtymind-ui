import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/ui/card.component/card.component';
import { SkeletonComponent } from '../../../../../../shared/ui/skeleton.component/skeleton.component';
import { MarketApiService } from '../../../../../../core/api/market-api.service';

@Component({
  selector: 'app-comparison-preview',
  standalone: true,
  imports: [CommonModule, CardComponent, SkeletonComponent],
  templateUrl: './comparison-preview.component.html',
  styleUrls: ['./comparison-preview.component.scss']
})
export class ComparisonPreviewComponent implements OnInit {
  loading = signal(true);
  error = signal<string | null>(null);
  data = signal<any>(null);
  readonly regionId = 'austin-tx';

  private marketApi = inject(MarketApiService);

  ngOnInit(): void {
    this.loadComparison();
  }

  private loadComparison(): void {
    this.loading.set(true);
    this.error.set(null);

    this.marketApi.getComparisonPreview(this.regionId).subscribe({
      next: (res: any) => {
        const fallbackData = {
          comparison: [
            { market: 'Austin–Round Rock–Georgetown, TX', medianPrice: 525000, change: 3.2 },
            { market: 'Dallas–Fort Worth–Arlington, TX', medianPrice: 445000, change: 2.1 },
            { market: 'Houston–The Woodlands–Sugar Land, TX', medianPrice: 385000, change: 1.8 },
            { market: 'San Antonio–New Braunfels, TX', medianPrice: 315000, change: 1.5 }
          ],
          locked: false
        };

        const displayData = {
          comparison: res.comparison || fallbackData.comparison,
          locked: res.locked ?? fallbackData.locked
        };

        this.data.set(displayData);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load market comparison data');
        this.loading.set(false);
      }
    });
  }
}
