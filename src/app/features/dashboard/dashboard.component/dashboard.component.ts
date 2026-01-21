import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MortgageCalculatorComponent } from '../../../shared/components/mortgage-calculator.component/mortgage-calculator.component';
import { MarketTrendCardComponent } from '../../../shared/components/market-trend-card-component/market-trend-card.component';
import { NeighborhoodScoreComponent } from '../../../shared/components/neighborhood-score.component/neighborhood-score.component';
import { AuthService } from '../../../core/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { LocationStateService } from '../../../core/state/location-state.service';
import { CardComponent } from '../../../shared/ui/card.component/card.component';
@Component({
  standalone: true,
  imports: [
    RouterModule, CardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  selector: 'app-dashboard'
})
export class DashboardComponent implements OnInit {
  // locationState = inject(LocationStateService);
  // location = this.locationState.location;
  // trendData = this.locationState.location; // already populated earlier
  // neighborhoodApi = inject(NeighborhoodApi);
  // score = signal<any>(null);
  // marketAnalytics = signal<any>(null);
  // marketApi = inject(MarketApi);

  // constructor(private meta: Meta, private title: Title) {
  //   effect(() => {
  //     console.log('Location changed:', this.location());

  //     const loc = this.location();
  //     if (!loc) return;

  //     if (loc?.lat !== undefined && loc?.lng !== undefined) {
  //       this.neighborhoodApi
  //         .getScore(loc.lat, loc.lng)
  //         .subscribe(res => this.score.set(res));

  //       this.marketApi
  //         .getAnalytics(loc.city, loc.locality)
  //         .subscribe(res => this.marketAnalytics.set(res));
  //     }


  //   });


  //   this.title.setTitle('Dashboard | RealtyMind');
  //   this.meta.updateTag({
  //     name: 'description',
  //     content: 'Real estate insights, trends and property analytics'
  //   });
  // }




  private locationState = inject(LocationStateService);
  private auth = inject(AuthService);
  private router = inject(Router);
  
  location = this.locationState.location;

  constructor() {
    // Use effect to react to role changes
    effect(() => {
      const role = this.auth.role();
      this.redirectBasedOnRole(role);
    });
  }

  ngOnInit() {
    // Initial redirect attempt
    const role = this.auth.role();
    this.redirectBasedOnRole(role);
  }

  private redirectBasedOnRole(role: number | null) {
    if (!role) {
      // No role means not authenticated
      this.router.navigate(['/login']);
      return;
    }

    switch (role) {
      case 1:
        this.router.navigate(['dashboard/buyer']);
        break;
      case 2:
        this.router.navigate(['dashboard/agent']);
        break;
      case 3:
        this.router.navigate(['dashboard/admin']);
        break;
      default:
        this.auth.logout();
        this.router.navigate(['/login']);
        break;
    }
  }

  changeLocation() {
    this.locationState.clear();
    this.router.navigate(['/select-location']);
  }
}
