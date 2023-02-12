import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MiscService {
  public streetMapRefBehSubject = new BehaviorSubject<L.Map>({} as L.Map);
  public streetMapRef = this.streetMapRefBehSubject.asObservable();
  public mapRef: L.Map = {} as L.Map;

  public currentLatLngBehSubject = new BehaviorSubject<L.LatLngExpression>([
    0, 0,
  ] as L.LatLngExpression);
  public currentLatLngObs = this.streetMapRefBehSubject.asObservable();
  public currentLatLng: L.LatLngExpression = {} as L.LatLngExpression;

  constructor() {
    this.streetMapRefBehSubject.subscribe((res) => {
      this.mapRef = res;
    });

    this.currentLatLngBehSubject.subscribe((res) => {
      this.currentLatLng = res;
    });
  }

  closeMapPopup() {
    this.mapRef.closePopup();
  }
}
