import {
  Component,
  ElementRef,
  ViewChild,
  effect,
  signal,
  Input
} from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  standalone: true,
  selector: 'app-market-trend-chart',
  template: `<canvas #canvas></canvas>`
})
export class MarketTrendChartComponent {

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @Input() data!: { labels: string[]; values: number[] };

  private chart!: Chart;

  ngAfterViewInit() {
    this.renderChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.data.labels = this.data.labels;
      this.chart.data.datasets[0].data = this.data.values;
      this.chart.update();
    }
  }

  private renderChart() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.data.labels,
        datasets: [
          {
            label: 'Price / SqFt',
            data: this.data.values,
            borderColor: '#2563eb',
            tension: 0.3
          }
        ]
      }
    });
  }
}
