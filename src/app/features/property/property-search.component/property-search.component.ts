import { Component, effect, inject, signal } from '@angular/core';
import { LocationStateService } from '../../../core/state/location-state.service';
import { Router } from '@angular/router';
import { PropertyApi } from '../../../core/api/property.service';
import { DecimalPipe } from '@angular/common';
import { CardComponent } from '../../../shared/ui/card.component/card.component';
import { SkeletonComponent } from '../../../shared/ui/skeleton.component/skeleton.component';
import { EmptyStateComponent } from '../../../shared/ui/empty-state.component/empty-state.component';
import { ErrorBannerComponent } from '../../../shared/ui/error-banner.component/error-banner.component';

@Component({
  selector: 'app-property-search',
  imports: [DecimalPipe, CardComponent, SkeletonComponent, EmptyStateComponent, ErrorBannerComponent],
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.scss']
})
export class PropertySearchComponent {

  properties = signal<any[]>([]);
  loading = signal(false);
  error = signal('');

  locationState = inject(LocationStateService);
  private propertyApi = inject(PropertyApi);

  location = this.locationState.location;

  constructor(
    private router: Router
  ) {
    effect(() => {
      const loc = this.location();
      debugger;
      if (!loc?.city || !loc?.locality) return;

      this.loading.set(true);
      this.error.set('');

      this.propertyApi.search(loc.city, loc.locality).subscribe({
        next: res => {
          this.properties.set(res);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to load properties');
          this.loading.set(false);
        }
      });
    });
  }

  openDetails(id: string) {
    this.router.navigate(['/properties', id]);
  }
}
