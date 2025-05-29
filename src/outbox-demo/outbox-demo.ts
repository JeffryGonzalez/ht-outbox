import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { workerStore } from './stores/workers';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-outbox-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  providers: [workerStore],
  template: `
    <p>Using the Outbox</p>

    @for (item of store.outboxAugmentedList().data; track item.item.id) {
      <pre class="m-4">
      {{ item | json }}
    </pre
      >
    }
  `,
  styles: ``,
})
export class OutboxDemo {
  readonly store = inject(workerStore);
}
