import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoaderService {
  private loadingPromise!: Promise<void>;

  load(): Promise<void> {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve, reject) => {
      if ((window as any).google) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = reject;

      document.head.appendChild(script);
    });

    return this.loadingPromise;
  }
}
