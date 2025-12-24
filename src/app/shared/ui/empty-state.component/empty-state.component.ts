import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-empty-state',
  template: `
    <div class="empty">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
    </div>
  `,
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {
  @Input() title = 'Nothing here';
  @Input() description = '';
}
