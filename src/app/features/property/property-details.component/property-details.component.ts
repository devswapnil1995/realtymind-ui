import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyApi } from '../../../core/api/property.service';
import { DecimalPipe } from '@angular/common';
import { ErrorBannerComponent } from '../../../shared/ui/error-banner.component/error-banner.component';
import { EmptyStateComponent } from '../../../shared/ui/empty-state.component/empty-state.component';
import { SkeletonComponent } from '../../../shared/ui/skeleton.component/skeleton.component';
import { CardComponent } from '../../../shared/ui/card.component/card.component';

@Component({
  standalone: true,
  imports: [DecimalPipe, CardComponent, SkeletonComponent, ErrorBannerComponent],
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  property = signal<any>(null);
  loading = signal(true);
  error = signal('');
  
  private propertyApi = inject(PropertyApi);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.propertyApi.getById(id).subscribe(res => {
      this.property.set(res);
      this.loading.set(false);
    });
  }
}
