import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteButtonComponent } from './favorite-button.component';

@NgModule({
  declarations: [FavoriteButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [FavoriteButtonComponent],
})
export class FavoriteButtonModule {}
