import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class GeoApi extends ApiService {

  geocode(address: string) {
    return this.get<any>(`/api/geo/geocode?address=${encodeURIComponent(address)}`);
  }

  reverseGeocode(lat: number, lng: number) {
    return this.get<any>(`/api/geo/reverse?lat=${lat}&lng=${lng}`);
  }
}
