import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteButtonComponent implements OnInit, OnChanges {
  @Input() isFavorite: boolean = false;
  @Input() size: number | undefined;

  public iconLabel!: string;

  constructor() {}

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.isFavorite) {
      this.iconLabel = changes.isFavorite.currentValue ? 'star' : 'star_outline';
    }
  }
}
