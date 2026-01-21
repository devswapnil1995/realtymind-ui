import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewInit,
  inject
} from '@angular/core';
import { GoogleMapsLoaderService } from '../../../core/services/google-maps-loader.service';
import { LocationStateService } from '../../../core/state/location-state.service';

@Component({
  standalone: true,
  selector: 'app-address-autocomplete',
  templateUrl: './address-autocomplete.component.html'
})
export class AddressAutocompleteComponent implements AfterViewInit {

  @ViewChild('addressInput') addressInput!: ElementRef<HTMLInputElement>;
  @Output() placeSelected = new EventEmitter<any>();

  private googleMapsLoader = inject(GoogleMapsLoaderService);
  private locationState = inject(LocationStateService);
  autocomplete!: google.maps.places.Autocomplete;

  ngAfterViewInit(): void {
    this.googleMapsLoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.addressInput.nativeElement,
        {
          types: ['geocode'],
          fields: ['formatted_address', 'geometry', 'address_components']

        }
      );

      this.autocomplete.addListener('place_changed', () => {
        debugger;
        const place = this.autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location || !place.address_components) return;

        const getComponent = (type: string) =>
          place.address_components?.find(c => c.types.includes(type))?.long_name || '';

        const selected = {
          address: place.formatted_address!,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),

          // 🔥 Structured fields
          city: getComponent('locality')
            || getComponent('administrative_area_level_2'),

          locality: getComponent('sublocality')
            || getComponent('sublocality_level_1')
            || getComponent('neighborhood')
        };

        this.locationState.setLocation(selected);
        this.placeSelected.emit(selected);

        console.log('Place selected:', selected);
      });

    });
  }
}
