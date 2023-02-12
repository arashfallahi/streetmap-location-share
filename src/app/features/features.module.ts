import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { StreetMapComponent } from './components/street-map/street-map.component';
import { LocationInfoComponent } from './components/location-info/location-info.component';
import { LocationInfoEditComponent } from './components/location-info-edit/location-info-edit.component';
import { LocationInfoDetailsComponent } from './components/location-info-details/location-info-details.component';
import { StreetMapSimpleComponent } from './components/street-map-simple/street-map-simple.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StreetMapComponent,
    LocationInfoComponent,
    LocationInfoEditComponent,
    LocationInfoDetailsComponent,
    StreetMapSimpleComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [StreetMapComponent],
  providers: [HttpClient, Window],
})
export class FeaturesModule {}
