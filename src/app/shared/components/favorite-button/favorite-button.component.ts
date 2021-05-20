import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteButtonComponent implements OnInit {
  @Input() isFavorite: boolean = false;

  public iconLabel!: string;

  constructor() {}

  public ngOnInit(): void {
    this.iconLabel = this.isFavorite ? 'star' : 'star_outline';
  }
}
