import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-error',
  template: `
    @if (message) {
    <div class="error">
      {{ message }}
    </div>
    }
  `,
  styleUrls: ['./error-banner.component.scss']
})
export class ErrorBannerComponent {
  @Input() message = '';
}
