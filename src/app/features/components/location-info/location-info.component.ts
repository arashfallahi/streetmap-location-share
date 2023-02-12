import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { LocationInfoItem } from 'src/app/core/locationInfoItem';
import { MiscService } from 'src/app/core/services/misc.service';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.css'],
})
export class LocationInfoComponent implements OnInit, OnDestroy {
  currentId = 0;
  locations: LocationInfoItem[] = [];
  currentIndex = 0;
  counter: number = 0;

  @Input() componentInstanceData: any;

  interval: any;
  locationInfoMode: 'EDIT' | 'VIEW' = 'VIEW';

  constructor(
    public elementRef: ElementRef,
    public changeDetectorRef: ChangeDetectorRef,
    public miscService: MiscService,
    public viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.locationInfoMode = 'VIEW';
  }
  closePopup() {
    this.miscService.closeMapPopup();
    this.locationInfoMode = 'VIEW';
  }

  ngOnDestroy(): void {}
}
