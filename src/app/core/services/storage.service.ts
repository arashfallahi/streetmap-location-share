import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { LocationInfoItem } from '../locationInfoItem';
import { LocationInfoComponent } from 'src/app/features/components/location-info/location-info.component';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  data2: any[] = [
    new LocationInfoItem(LocationInfoComponent, {
      id: 1,
      locationName: "John's Home",
      latLng: [35.74817038608934, 51.44720632015608],
      locationType: 'Personal',
      logoUrl: 'https://example.com/?l=1',
    }),
    new LocationInfoItem(LocationInfoComponent, {
      id: 2,
      locationName: "Sarah's Shop",
      latLng: [35.74760224431772, 51.50892569313177],
      locationType: 'Business',
      logoUrl: 'https://example.com/?l=2',
    }),
    new LocationInfoItem(LocationInfoComponent, {
      id: 3,
      locationName: "Helia's School",
      latLng: [35.737659106876556, 51.52642646019317],
      locationType: 'Bisiness',
      logoUrl: 'https://example.com/?l=3',
    }),
    new LocationInfoItem(LocationInfoComponent, {
      id: 4,
      locationName: "Katty's Home",
      latLng: [35.770071472300124, 51.368299106422015],
      locationType: 'Personal',
      logoUrl: 'https://example.com/?l=4',
    }),
    new LocationInfoItem(LocationInfoComponent, {
      id: 5,
      locationName: "Melanie's University",
      latLng: [35.77856005829104, 51.45385661173952],
      locationType: 'Business',
      logoUrl: 'https://example.com/?l=5',
    }),
    new LocationInfoItem(LocationInfoComponent, {
      id: 5,
      locationName: "Ahmad's Home",
      latLng: [35.707927998334426, 51.41293106473873],
      locationType: 'Personal',
      logoUrl: 'https://example.com/?l=6',
    }),
    new LocationInfoItem(LocationInfoComponent, {
      id: 5,
      locationName: "Nina's Saloon",
      latLng: [35.73357154196068, 51.38889847179896],
      locationType: 'Business',
      logoUrl: 'https://example.com/?l=7',
    }),
    new LocationInfoItem(LocationInfoComponent, {
      id: 5,
      locationName: "Parmida's Home",
      latLng: [35.74806206753395, 51.27560196222574],
      locationType: 'Personal',
      logoUrl: 'https://example.com/?l=8',
    }),
    new LocationInfoItem(LocationInfoComponent, {
      id: 5,
      locationName: "Armita's School",
      latLng: [35.77619958970534, 51.35319290514558],
      locationType: 'Business',
      logoUrl: 'https://example.com/?l=9',
    }),
    new LocationInfoItem(LocationInfoComponent, {
      id: 5,
      locationName: "Ali's Shop",
      latLng: [35.704582579856385, 51.35353622790186],
      locationType: 'Business',
      logoUrl: 'https://example.com/?l=10',
    }),
  ];

  getInfo2(): Observable<any[]> {
    return of(this.data2);
  }

  saveData(data: any): Observable<any[]> {
    let length = Object.keys(this.data2).length;
    for (let key in this.data2) {
      if (this.data2[key].data.id == data.id) {
        Object.keys(data).forEach((objKey) => {
          this.data2[key]['data'][`${objKey}`] = data[`${objKey}`];
        });
      }
    }
    return of(this.data2);
  }
}
