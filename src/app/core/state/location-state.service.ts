import { Injectable, signal } from '@angular/core';

export interface SelectedLocation {
  address: string;
  lat: number;
  lng: number;
  city: string;
  locality: string;
}

@Injectable({ providedIn: 'root' })
export class LocationStateService {

  private readonly _location = signal<SelectedLocation | null>(null);

  location = this._location.asReadonly();

  setLocation(loc: SelectedLocation) {
    this._location.set(loc);
  }

  clear() {
    this._location.set(null);
  }
}
