import {
  AfterViewInit,
  Component,
  ComponentRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { LocationInfoItem } from 'src/app/core/locationInfoItem';
import { StorageService } from 'src/app/core/services/storage.service';
import { MiscService } from 'src/app/core/services/misc.service';
import { LocationInfoDetailsComponent } from '../location-info-details/location-info-details.component';
import { LocationInfoComponent } from '../location-info/location-info.component';

@Component({
  selector: 'app-street-map',
  templateUrl: './street-map.component.html',
  styleUrls: ['./street-map.component.css'],
})
export class StreetMapComponent implements AfterViewInit, OnDestroy {
  public streetMap: any;
  private tileServerUrl: string;
  private tileLayerAttribution: string;
  private initialZoom: number;
  public componentRef: ComponentRef<LocationInfoComponent> =
    {} as ComponentRef<LocationInfoComponent>;

  public componentRef2: ComponentRef<LocationInfoDetailsComponent> =
    {} as ComponentRef<LocationInfoDetailsComponent>;

  @ViewChild(LocationInfoComponent, { read: ViewContainerRef })
  containerComponent: ViewContainerRef = {} as ViewContainerRef;

  infos: LocationInfoItem[] = [];

  @ViewChild('interactiveMap') mapContainer2: any = {} as any;

  constructor(
    private storageService: StorageService,
    private miscService: MiscService
  ) {
    this.tileServerUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    // this.tileServerUrl =
    //   'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
    this.tileLayerAttribution =
      '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>';
    this.initialZoom = 13;
  }

  ngAfterViewInit(): void {
    this.loadMap();

    this.storageService.getInfo2().subscribe((data: any) => {
      this.infos = data;
    });
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

    this.streetMap = L.map(this.mapContainer2.nativeElement);
    this.streetMap.setView([0, 0], 1);
    L.tileLayer(this.tileServerUrl, {
      attribution: this.tileLayerAttribution,
      maxZoom: 19,
    }).addTo(this.streetMap);

    this.miscService.streetMapRefBehSubject.next(this.streetMap);

    this.getCurrentPosition().subscribe((position: any) => {
      latLng = [position.latitude, position.longitude];
      this.streetMap.setView(latLng, this.initialZoom);

      const point = this.streetMap.latLngToContainerPoint([
        position.latitude,
        position.longitude,
      ]);

      const data: any = {
        id: 0,
        locationName: '',
        latLng: latLng,
        locationType: '',
        logoUrl: '',
      };

      this.infos.push(new LocationInfoItem(LocationInfoComponent, data));

      this.componentRef = this.containerComponent.createComponent(
        LocationInfoComponent
      );

      this.componentRef.instance.componentInstanceData = new LocationInfoItem(
        LocationInfoComponent,
        data
      );

      this.miscService.currentLatLngBehSubject.next(latLng);
      this.addAllKnownPlacesMarkers();
    });
  }

  addAllKnownPlacesMarkers() {
    this.infos.forEach((datum, index) => {
      const iconUrl: string = 'assets/images/marker-icon.png';
      const iconUrl2: string = 'assets/images/marker2-icon.png';
      const iconWidth: number = 30;
      const iconHeight: number = 50;

      const icon = L.icon({
        iconUrl: datum?.data?.id == 0 ? iconUrl : iconUrl2,
        popupAnchor: [13, 0],
        iconSize: [iconWidth, iconHeight],
        iconAnchor: [15, 25],
      });

      this.componentRef = this.containerComponent.createComponent(
        LocationInfoComponent
      );

      this.componentRef.instance.componentInstanceData = datum.data;
      this.componentRef.instance.locationInfoMode = 'VIEW';

      const marker = L.marker([datum.data.latLng[0], datum.data.latLng[1]], {
        icon,
      })
        .bindPopup(this.componentRef.instance.elementRef.nativeElement, {
          maxHeight: 700,
          maxWidth: 300,
        })
        .addTo(this.streetMap);
    });
  }

  ngOnDestroy(): void {
    this.containerComponent.clear();
    this.componentRef.destroy();
  }
}
