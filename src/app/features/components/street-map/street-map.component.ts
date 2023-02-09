import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs/internal/Subscriber';

@Component({
  selector: 'app-street-map',
  templateUrl: './street-map.component.html',
  styleUrls: ['./street-map.component.css'],
})
export class StreetMapComponent implements AfterViewInit {
  private streetMap: any;
  private tileServerUrl: string;
  private tileLayerAttribution: string;
  private initialZoom: number;

  constructor() {
    this.tileServerUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.tileLayerAttribution =
      '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>';
    this.initialZoom = 15;
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  private loadMap(): void {
    let latLng: L.LatLngExpression;
    const iconUrl: string = 'assets/images/marker-icon.png';
    const iconWidth: number = 30;
    const iconHeight: number = 50;

    this.streetMap = L.map('map').setView([0, 0], 1);
    L.tileLayer(this.tileServerUrl, {
      attribution: this.tileLayerAttribution,
      maxZoom: 19,
    }).addTo(this.streetMap);

    this.getCurrentPosition().subscribe((position: any) => {
      latLng = [position.latitude, position.longitude];
      this.streetMap.setView(latLng, this.initialZoom);

      const point = this.streetMap.latLngToContainerPoint([
        position.latitude,
        position.longitude,
      ]);

      // const newPoint = L.point([
      //   point.x - (iconWidth / 2),
      //   point.y - (iconHeight / 2),
      // ]);
      // const newLatLng = this.streetMap.containerPointToLatLng(newPoint);

      const icon = L.icon({
        iconUrl: iconUrl,
        popupAnchor: [13, 0],
        iconSize: [iconWidth, iconHeight],
      });

      const marker = L.marker(latLng, {
        icon,
      }).bindPopup('My location');
      marker.addTo(this.streetMap);
    });
  }
}
