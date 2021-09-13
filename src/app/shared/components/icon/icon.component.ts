import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() iconPath!: string;
  @Input() classes: string[] | undefined;
  @Input() title: string | undefined;
  @Input() width: number = 18;
  @Input() height: number = 18;
}
