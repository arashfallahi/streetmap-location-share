import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { StreetMapComponent } from './components/street-map/street-map.component';

@NgModule({
  declarations: [StreetMapComponent],
  imports: [CommonModule, FeaturesRoutingModule],
  exports: [StreetMapComponent],
})
export class FeaturesModule {}
