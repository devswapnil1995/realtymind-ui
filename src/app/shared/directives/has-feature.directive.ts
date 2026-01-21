import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, inject, effect } from '@angular/core';
import { FeatureService, FeatureKey } from '../../core/services/feature.service';

/**
 * Structural directive to conditionally render elements based on feature access
 * 
 * Usage:
 * <div *hasFeature="'NeighborhoodScore'">
 *   <!-- Content shown only if user has access -->
 * </div>
 */
@Directive({
  selector: '[hasFeature]',
  standalone: true
})
export class HasFeatureDirective implements OnInit {
  @Input() hasFeature!: FeatureKey;
  
  private featureService = inject(FeatureService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  constructor() {
    // React to role/plan changes
    effect(() => {
      // Trigger on any role/plan change
      this.featureService.isBuyer();
      this.featureService.isAgent();
      this.featureService.isAdmin();
      this.featureService.getCurrentPlan();
      
      this.updateView();
    });
  }

  ngOnInit() {
    this.updateView();
  }

  private updateView() {
    if (this.featureService.hasFeature(this.hasFeature)) {
      // User has access - render the element
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // User doesn't have access - remove the element
      this.viewContainer.clear();
    }
  }
}
