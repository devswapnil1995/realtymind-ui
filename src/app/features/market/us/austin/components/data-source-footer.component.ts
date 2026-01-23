import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-source-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="data-source-footer">
      <div class="in-development-banner">
        <span class="banner-icon">🚧</span>
        <span class="banner-text">Austin Market Intelligence is under active development using authoritative US data sources.</span>
      </div>

      <div class="source-info">
        <div class="source-item">
          <span class="source-label">Primary Data Source:</span>
          <span class="source-value">Zillow Home Value Index</span>
        </div>
        <div class="source-item">
          <span class="source-label">Geographic Scope:</span>
          <span class="source-value">Austin–Round Rock–Georgetown, TX (Metropolitan Area)</span>
        </div>
        <div class="source-item">
          <span class="source-label">Data Frequency:</span>
          <span class="source-value">Monthly updates</span>
        </div>
        <div class="source-item">
          <span class="source-label">Scope:</span>
          <span class="source-value">Metro-level aggregates only</span>
        </div>
      </div>

      <div class="disclaimer">
        <p>This dashboard displays metro-level market analysis. Neighborhood-level precision is not currently available. All data is sourced from authoritative US market providers.</p>
      </div>
    </div>
  `,
  styles: [`
    .data-source-footer {
      margin-top: 2rem;
      padding: 1.5rem;
      background: #f9f9f9;
      border-radius: 8px;
      border-left: 4px solid #ffc107;
    }

    .in-development-banner {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: #fff8e1;
      border-radius: 6px;
      margin-bottom: 1.5rem;
      border: 1px solid #ffe082;
    }

    .banner-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .banner-text {
      font-size: 0.95rem;
      color: #333;
      line-height: 1.5;
    }

    .source-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .source-item {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .source-label {
      font-weight: 600;
      color: #1a1a1a;
      font-size: 0.875rem;
    }

    .source-value {
      color: #666;
      font-size: 0.875rem;
    }

    .disclaimer {
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
      font-size: 0.85rem;
      color: #999;
      line-height: 1.6;
    }

    .disclaimer p {
      margin: 0;
    }

    @media (max-width: 768px) {
      .data-source-footer {
        padding: 1rem;
      }

      .source-info {
        grid-template-columns: 1fr;
      }

      .banner-text {
        font-size: 0.9rem;
      }
    }
  `]
})
export class DataSourceFooterComponent {}
