import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '../icon/icon.module';
import { FavoriteButtonComponent } from './favorite-button.component';

@NgModule({
  declarations: [FavoriteButtonComponent],
  imports: [CommonModule, IconModule, MatButtonModule, MatIconModule],
  exports: [FavoriteButtonComponent],
})
export class FavoriteButtonModule {}
