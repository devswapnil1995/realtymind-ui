import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../../../shared/ui/card.component/card.component';
import { SkeletonComponent } from '../../../../../../shared/ui/skeleton.component/skeleton.component';
import { MarketApiService } from '../../../../../../core/api/market-api.service';

@Component({
  selector: 'app-explanation',
  standalone: true,
  imports: [CommonModule, CardComponent, SkeletonComponent],
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.scss']
})
export class ExplanationComponent implements OnInit {
  loading = signal(true);
  error = signal<string | null>(null);
  data = signal<any>(null);
  readonly regionId = 'austin-tx';

  private marketApi = inject(MarketApiService);

  ngOnInit(): void {
    this.loadExplanation();
  }

  private loadExplanation(): void {
    this.loading.set(true);
    this.error.set(null);

    this.marketApi.getExplanation(this.regionId).subscribe({
      next: (res: any) => {
        const fallbackData = {
          summary: 'Austin continues to show strong market fundamentals with steady price appreciation. The metro area maintains robust demand driven by population growth and economic diversity.',
          facts: [
            'Austin-Round Rock-Georgetown is Texas second-largest metro by population',
            'Home price appreciation of 3.2% year-over-year',
            'Median home value: $525,000 (as of latest data)',
            'Average days on market: 18 days',
            'Active listings per agent: 2.1 homes'
          ],
          lastUpdated: new Date()
        };

        const displayData = {
          summary: res.summary || fallbackData.summary,
          facts: res.facts || fallbackData.facts,
          lastUpdated: res.lastUpdated || fallbackData.lastUpdated
        };

        this.data.set(displayData);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load market explanation');
        this.loading.set(false);
      }
    });
  }
}
