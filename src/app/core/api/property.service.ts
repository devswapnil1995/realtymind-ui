import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class PropertyApi extends ApiService {

  getProperty(address: string) {
    return this.get<any>(
      `/api/property/provider/zillow?address=${encodeURIComponent(address)}`
    );
  }

  search(city: string, locality: string) {
    return this.get<any[]>(
      `/api/properties/search?city=${encodeURIComponent(city)}&locality=${encodeURIComponent(locality)}`
    );
  }

  getById(id: string) {
    return this.get<any>(`/api/properties/${id}`);
  }
}
