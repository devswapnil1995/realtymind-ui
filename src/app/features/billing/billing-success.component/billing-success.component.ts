import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/ui/card.component/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-success',
  imports: [CardComponent],
  templateUrl: './billing-success.component.html',
  styleUrl: './billing-success.component.scss',
})
export class BillingSuccessComponent {

  private router = inject(Router);

  constructor() {
    setTimeout(() => this.router.navigate(['/dashboard']), 2000);
  }
}