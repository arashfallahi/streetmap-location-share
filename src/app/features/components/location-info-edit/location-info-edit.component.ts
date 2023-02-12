import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage.service';
import { MiscService } from 'src/app/core/services/misc.service';
import { StreetMapSimpleComponent } from '../street-map-simple/street-map-simple.component';
import { StreetMapComponent } from '../street-map/street-map.component';

@Component({
  selector: 'app-location-info-edit',
  templateUrl: './location-info-edit.component.html',
  styleUrls: ['./location-info-edit.component.css'],
})
export class LocationInfoEditComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  // defaultLatLng: L.LatLngExpression = [35.742805859527465, 51.534106623271335];
  defaultLatLng: L.LatLngExpression = [0, 0];
  @Input() componentInstanceData: any;

  locationInfoForm: FormGroup;
  percentDone: number = 0;
  uploadSuccess: boolean = false;
  blobUrl: string = '';
  chosenFile: any;
  uploadProgressText: string = '';
  uploadInProgress: boolean = false;
  uploadedFileLink: string = '';
  currentItemId: number = -1;
  selectedLocationType = null;
  possibleLocationTypeItems = [
    {
      key: 'personal',
      value: 'Personal',
    },
    { key: 'business', value: 'Business' },
  ];

  formControlsWithoutUi = {
    id: -1,
    logoUrl: '',
    latLng: [0, 0] as L.LatLngExpression,
  };

  @ViewChild(StreetMapComponent)
  streetMapComponent: StreetMapComponent = {} as StreetMapComponent;
  @Output() resetPopupContentMode = new EventEmitter<'VIEW' | 'EDIT'>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient,
    private miscService: MiscService,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {
    this.locationInfoForm = new FormGroup({
      id: new FormControl(''),
      locationName: new FormControl(''),
      latLng: new FormControl(''),
      logoUrl: new FormControl(''),
      locationType: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.miscService.currentLatLngBehSubject.subscribe((res) => {
      this.defaultLatLng = res;

      this.locationInfoForm.get('latLng')?.patchValue(`${this.defaultLatLng}`);
    });
    this.selectedLocationType = this.componentInstanceData?.locationType;
    this.locationInfoForm
      .get('id')
      ?.patchValue(`${this.componentInstanceData?.id}`);
  }
  ngAfterViewInit(): void {
    Object.keys(this.locationInfoForm.controls).forEach((name) => {
      this.locationInfoForm
        .get(`${name}`)
        ?.patchValue(this.componentInstanceData[`${name}`]);
    });
  }

  ngOnDestroy(): void {
    // this.componentRef.destroy();
  }

  closePopup() {
    this.miscService.closeMapPopup();
    this.resetPopupContentMode.emit('VIEW');
  }

  getBlobUrl(event: any) {
    let url;
    if (event.target.files && event.target.files[0]) {
      this.chosenFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.blobUrl = event?.target?.result as string;
      };
    }
  }

  saveData() {
    this.storageService
      .saveData(this.locationInfoForm.value)
      .subscribe((res) => {
        console.log('Your Information Saved In Memory!');
      });
    this.closePopup();
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.chosenFile);

    this.http
      .post('https://file.io', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((response) => {
        if (response.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(
            (100 * response.loaded) / (response.total ? response.total : 1)
          );
          this.uploadProgressText = `Upload in progress! ${this.percentDone}% completed.`;
          this.uploadInProgress = true;
        } else if (response instanceof HttpResponse) {
          this.uploadSuccess = true;
          this.uploadInProgress = false;
          this.uploadProgressText = '';
          const responseBody: any = response;
          this.uploadedFileLink = responseBody?.body?.link;
          this.locationInfoForm
            .get('logoUrl')
            ?.patchValue(`${responseBody?.body?.link}`);
          this.blobUrl = '';
          this.chosenFile = null;
        } else if (response instanceof HttpErrorResponse) {
          this.uploadSuccess = false;
          this.uploadInProgress = false;
          this.uploadProgressText = '';
        }
      });
  }
}
