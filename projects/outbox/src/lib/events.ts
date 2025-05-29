import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { ErrorResponseEntity, RequestEntity } from './types';

export const outboxEvents = eventGroup({
  source: 'ng-outbox',
  events: {
    responseHadError: type<ErrorResponseEntity>(),
    errorCleared: type<{ errorId: string }>(),
  },
});

export const outboxInternalEvents = eventGroup({
  source: 'ng-outbox-internal',
  events: {
    requestSent: type<RequestEntity>(),
    responseReceived: type<RequestEntity>(),
  },
});
