import { Component, Input } from '@angular/core';
import { KeyValuePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [KeyValuePipe],
  selector: 'app-neighborhood-score',
  templateUrl: './neighborhood-score.component.html',
  styleUrls: ['./neighborhood-score.component.scss']
})
export class NeighborhoodScoreComponent {
  @Input() data!: any;

  color(score: number) {
    if (score >= 8) return 'green';
    if (score >= 6) return 'orange';
    return 'red';
  }
}
