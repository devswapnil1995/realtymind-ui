import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-card',
  template: `
    <div class="ui-card">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent {}