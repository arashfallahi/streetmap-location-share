import * as L from 'leaflet';

export interface LocationInfoInterface {
  id?: number;
  locationName?: string;
  latLng?: L.LatLngExpression;
  locationType: 'Business' | 'Personal';
  logoUrl: string;

  data?: {
    id?: number;
    locationName?: string;
    latLng?: L.LatLngExpression;
    locationType: 'Business' | 'Personal';
    logoUrl: string;
  };
}
