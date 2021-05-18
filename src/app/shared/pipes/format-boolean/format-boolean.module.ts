import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatBooleanPipe } from './format-boolean.pipe';

@NgModule({
  declarations: [FormatBooleanPipe],
  imports: [CommonModule],
  exports: [FormatBooleanPipe],
})
export class FormatBooleanModule {}
