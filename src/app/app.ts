import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleMapsLoaderService } from './core/services/google-maps-loader.service';
import { AddressAutocompleteComponent } from './shared/components/address-autocomplete.component/address-autocomplete.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddressAutocompleteComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private mapsLoader: GoogleMapsLoaderService) { }

  ngOnInit(): void {
    this.mapsLoader.load()
      .then(() => console.log('Google Maps loaded'))
      .catch(() => console.error('Google Maps failed to load'));
  }

  onPlaceSelected(place: any) {
    console.log('Place selected in App component:', place);
  }
}
