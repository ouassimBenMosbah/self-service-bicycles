import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-organization-presentation',
  templateUrl: './organization-presentation.component.html',
  styleUrls: ['./organization-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationPresentationComponent {}
