import {
  Component,
  AfterViewInit,
  OnInit,
  AfterContentInit,
  ViewChild,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs/internal/Subscriber';
import * as L from 'leaflet';

@Component({
  selector: 'app-street-map-simple',
  templateUrl: './street-map-simple.component.html',
  styleUrls: ['./street-map-simple.component.css'],
})
export class StreetMapSimpleComponent implements AfterViewInit {
  private tileServerUrl: string;
  private tileLayerAttribution: string;
  private initialZoom: number;
  public streetMap2: any;
  @ViewChild('simpleMap') mapContainer: any = {} as any;
  @Input() defaultLatLng: L.LatLngExpression = [0, 0];

  constructor() {
    this.tileServerUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    // this.tileServerUrl =
    //   'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
    this.tileLayerAttribution =
      '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>';
    this.initialZoom = 13;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadMap();
    }, 0);
  }

  // private getCurrentPosition(): any {
  //   return new Observable((observer: Subscriber<any>) => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position: any) => {
  //         observer.next({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //         observer.complete();
  //       });
  //     } else {
  //       observer.error();
  //     }
  //   });
  // }

  private loadMap(): void {
    let latLng: L.LatLngExpression;
    this.initialZoom = 14;

    this.streetMap2 = L.map(this.mapContainer.nativeElement);
    this.streetMap2.setView([0, 0], 1);

    L.tileLayer(this.tileServerUrl, {
      attribution: this.tileLayerAttribution,
      maxZoom: 19,
    }).addTo(this.streetMap2);

    this.streetMap2.setView(this.defaultLatLng, this.initialZoom);

    // const point = this.streetMap2.latLngToContainerPoint([
    //   position.latitude,
    //   position.longitude,
    // ]);

    const iconUrl: string = 'assets/images/marker-icon.png';
    const iconUrl2: string = 'assets/images/marker2-icon.png';
    const iconWidth: number = 30;
    const iconHeight: number = 50;

    // const newPoint = L.point([
    //   point.x - (iconWidth / 2),
    //   point.y - (iconHeight / 2),
    // ]);
    // const newLatLng = this.streetMap.containerPointToLatLng(newPoint);

    const data: any = {
      id: 0,
      locationName: 'My current location',
      latLng: this.defaultLatLng,
      locationType: '',
      logoUrl: '',
    };

    // this.sendData(data);

    const icon = L.icon({
      iconUrl: iconUrl,
      popupAnchor: [13, 0],
      iconSize: [iconWidth, iconHeight],
      iconAnchor: [15, 25],
    });

    const marker = L.marker(this.defaultLatLng, {
      icon,
    }).addTo(this.streetMap2);
    // });
  }
}
