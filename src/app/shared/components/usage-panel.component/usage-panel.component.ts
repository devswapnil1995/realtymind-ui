import { Component } from '@angular/core';
import { ApiService } from '../../../core/api/api.service';
import { CardComponent } from '../../ui/card.component/card.component';

@Component({
  selector: 'app-usage-panel',
  imports: [CardComponent],
  templateUrl: './usage-panel.component.html',
  styleUrl: './usage-panel.component.scss',
})
export class UsagePanelComponent {
  usage: any[] = [];
  isLimitReached = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get<any[]>('/api/usage/today')
      .subscribe(data => {
        this.usage = data;
        this.isLimitReached = data.some(x => x.used >= x.limit);
      });
  }
}
