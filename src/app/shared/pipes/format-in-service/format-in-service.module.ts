import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatInServicePipe } from './format-in-service.pipe';

@NgModule({
  declarations: [FormatInServicePipe],
  imports: [CommonModule],
  exports: [FormatInServicePipe],
})
export class FormatInServiceModule {}
