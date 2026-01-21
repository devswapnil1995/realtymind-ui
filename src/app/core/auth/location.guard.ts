import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LocationStateService } from '../state/location-state.service';

@Injectable({ providedIn: 'root' })
export class LocationGuard implements CanActivate {

  private locationState = inject(LocationStateService);
  private router = inject(Router);

  canActivate(): boolean | UrlTree {
    const location = this.locationState.location();

    if (!location) {
      return this.router.createUrlTree(['/select-location']);
    }

    return true;
  }
}
