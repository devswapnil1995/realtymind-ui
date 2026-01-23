import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { MarketApiService } from '../../../../../../core/api/market-api.service';
import { CardComponent } from '../../../../../../shared/ui/card.component/card.component';
import { SkeletonComponent } from '../../../../../../shared/ui/skeleton.component/skeleton.component';

@Component({
  selector: 'app-price-rent-trends',
  standalone: true,
  imports: [CommonModule, CardComponent, SkeletonComponent],
  templateUrl: './price-rent-trends.component.html',
  styleUrls: ['./price-rent-trends.component.scss']
})
export class PriceRentTrendsComponent implements OnInit, AfterViewInit {
  @ViewChild('trendChart') chartRef?: ElementRef<HTMLCanvasElement>;

  loading = signal(true);
  error = signal<string | null>(null);
  chart?: Chart;
  private chartData: any = null;
  private viewInitialized = false;

  private marketApi = inject(MarketApiService);
  private readonly regionId = 'austin-tx';

  ngOnInit(): void {
    this.loadTrends();
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    // If data already loaded, render now that view is ready
    if (this.chartData && this.chartRef?.nativeElement) {
      setTimeout(() => this.renderChart(this.chartData), 100);
    }
  }

  private loadTrends(): void {
    this.loading.set(true);
    this.error.set(null);

    this.marketApi.getPriceRentTrends(this.regionId).subscribe({
      next: (data: any) => {
        if (data) {
          this.chartData = data;
          // Only render if view is already initialized
          if (this.viewInitialized && this.chartRef?.nativeElement) {
            setTimeout(() => this.renderChart(data), 100);
          }
        } else {
          this.error.set('Failed to load trends');
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Something went wrong while loading trend data');
        this.loading.set(false);
      }
    });
  }

  private renderChart(data: any): void {
    try {
      // Extract data from API response structure
      const apiData = data.data || data;
      const series = apiData.series || {};
      
      const salePriceData = series.medianSalePrice || [];
      const rentData = series.medianRent || [];

      if (!salePriceData.length || !rentData.length) {
        this.error.set('No chart data available');
        return;
      }

      // Reverse to show oldest first (chronological order)
      const salePrices = [...salePriceData].reverse();
      const rents = [...rentData].reverse();

      // Extract labels from months and values
      const labels = salePrices.map((item: any) => {
        const [year, month] = item.month.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      });

      const salePriceValues = salePrices.map((item: any) => item.value);
      const rentValues = rents.map((item: any) => item.value);

      const config: ChartConfiguration = {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Median Sale Price',
              data: salePriceValues,
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              tension: 0.3,
              fill: false,
              pointRadius: 4,
              pointBackgroundColor: '#4CAF50',
              yAxisID: 'y'
            },
            {
              label: 'Median Rent',
              data: rentValues,
              borderColor: '#2196F3',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              tension: 0.3,
              fill: false,
              pointRadius: 4,
              pointBackgroundColor: '#2196F3',
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 15,
                font: {
                  size: 13,
                  weight: '500' as any
                },
                color: '#333'
              }
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              beginAtZero: false,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                color: '#666',
                callback: (value) => `$${(value as number).toLocaleString()}`
              },
              title: {
                display: true,
                text: 'Sale Price ($)',
                color: '#1a1a1a'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              beginAtZero: false,
              grid: {
                drawOnChartArea: false
              },
              ticks: {
                color: '#666',
                callback: (value) => `$${(value as number).toLocaleString()}`
              },
              title: {
                display: true,
                text: 'Rent ($/mo)',
                color: '#1a1a1a'
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#666'
              }
            }
          }
        }
      };

      if (this.chart) {
        this.chart.destroy();
      }

      if (!this.chartRef?.nativeElement) {
        this.error.set('Chart canvas not available');
        return;
      }

      this.chart = new Chart(this.chartRef.nativeElement, config);
    } catch (err) {
      console.error('Error rendering chart:', err);
      this.error.set('Failed to render chart');
    }
  }
}

