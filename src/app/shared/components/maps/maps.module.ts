import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { SafeHtmlModule } from '../../pipes/safe-html/safe-html.module';
import { MapsComponent } from './maps.component';

@NgModule({
  declarations: [MapsComponent],
  imports: [CommonModule, GoogleMapsModule, SafeHtmlModule],
  exports: [MapsComponent],
})
export class MapsModule {}
