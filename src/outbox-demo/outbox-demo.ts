import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-outbox-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Using the Outbox</p> `,
  styles: ``,
})
export class OutboxDemo {}
