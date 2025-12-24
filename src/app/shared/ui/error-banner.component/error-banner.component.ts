import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-error',
  template: `
    <div class="error" *ngIf="message">
      {{ message }}
    </div>
  `,
  styleUrls: ['./error-banner.component.scss']
})
export class ErrorBannerComponent {
  @Input() message = '';
}
