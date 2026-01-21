import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upgrade-cta',
  standalone: true,
  templateUrl: './upgrade-cta.component.html',
  styleUrls: ['./upgrade-cta.component.scss']
})
export class UpgradeCtaComponent {
  @Input() title: string = 'Upgrade to Pro';
  @Input() description: string = 'Unlock this feature with a Pro subscription';
  @Input() icon: string = '🔒';

  constructor(private router: Router) {}

  navigateToPricing() {
    this.router.navigate(['/pricing']);
  }
}
