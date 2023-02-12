import { LocationInfoInterface } from '../interfaces/location-info';
import * as L from 'leaflet';
export class LocationInfoModel implements LocationInfoInterface {
  id: number;
  locationName: string;
  latLng: L.LatLngExpression;
  locationType: 'Personal' | 'Business';
  logoUrl: string;

  constructor(
    id: number,
    locationName: string,
    latLng: L.LatLngExpression,
    locationType: 'Personal' | 'Business',
    logoUrl: string
  ) {
    this.id = id;
    this.locationName = locationName;
    this.latLng = latLng;
    this.locationType = locationType;
    this.logoUrl = logoUrl;
  }

  getLocationInfo(): Object {
    return `{id: ${this.id}, locationName: ${this.locationName}, latLng: ${this.latLng}, locationType: ${this.locationType}, logoUrl: ${this.logoUrl}}`;
  }
}
