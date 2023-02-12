import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { LocationInfoItem } from 'src/app/core/locationInfoItem';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-location-info-details',
  templateUrl: './location-info-details.component.html',
  styleUrls: ['./location-info-details.component.css'],
})
export class LocationInfoDetailsComponent {
  currentId = 0;
  locations: LocationInfoItem[] = [];
  currentIndex = 0;
  counter: number = 0;
  noValueText: string = 'No Value.';

  @Input() componentInstanceData: any;

  constructor(
    private StorageService: StorageService,
    public elementRef: ElementRef,
    public changeDetectorRef: ChangeDetectorRef
  ) {}
}
