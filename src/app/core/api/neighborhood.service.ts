import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class NeighborhoodApi extends ApiService {

  getScore(lat: number, lng: number) {
    return this.get<any>(
      `/api/neighborhood/score?lat=${lat}&lng=${lng}`
    );
  }
  
}
