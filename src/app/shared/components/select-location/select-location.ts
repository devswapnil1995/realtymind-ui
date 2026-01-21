import { Component, inject } from '@angular/core';
import { LocationStateService } from '../../../core/state/location-state.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { AddressAutocompleteComponent } from '../address-autocomplete.component/address-autocomplete.component';

@Component({
  selector: 'app-select-location',
  imports: [AddressAutocompleteComponent],
  templateUrl: './select-location.html',
  styleUrl: './select-location.scss',
})
export class SelectLocation {
  private locationState = inject(LocationStateService);
  private router = inject(Router);
  private auth = inject(AuthService);

  loading = false;
  error: string | null = null;

  /**
   * This method will be called by Google Places component
   */
  onPlaceSelected(place: any) {
    try {
      this.loading = true;
      this.error = null;

      if (!place?.lat || !place?.lng || !place?.city) {
        throw new Error('Invalid location selected');
      }

      this.locationState.setLocation(place);

      // Role-based redirect
      const role = this.auth.role();

      switch (role) {
        case 1:
          this.router.navigate(['/dashboard/buyer']);
          break;
        case 2:
          this.router.navigate(['/dashboard/agent']);
          break;
        case 3:
          this.router.navigate(['/dashboard/admin']);
          break;
        default:
          this.router.navigate(['/logout']);
      }

    } catch (err) {
      this.error = 'Please select a valid location from the list.';
    } finally {
      this.loading = false;
    }
  }
}
