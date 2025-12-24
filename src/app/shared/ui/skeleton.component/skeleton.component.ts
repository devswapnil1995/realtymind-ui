import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-skeleton',
  template: `<div class="skeleton" [style.height.px]="height"></div>`,
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  @Input() height = 16;
}
