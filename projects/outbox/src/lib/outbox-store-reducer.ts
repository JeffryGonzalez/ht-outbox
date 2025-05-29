import { signalStoreFeature, type } from '@ngrx/signals';
import {
  EntityState,
  removeEntity,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { on, withReducer } from '@ngrx/signals/events';
import { outboxEvents, outboxInternalEvents } from './events';
import { RequestEntity, ErrorResponseEntity } from './types';

export function withOutboxReducer() {
  return signalStoreFeature(
    {
      state: type<EntityState<RequestEntity>>(),
    },
    withReducer(
      on(outboxInternalEvents.requestSent, ({ payload }) => setEntity(payload)),
      on(
        outboxInternalEvents.responseReceived,
        outboxEvents.responseHadError,
        ({ payload }) => removeEntity(payload.id),
      ),
    ),
  );
}

export function withDeadLetterReducer() {
  return signalStoreFeature(
    withEntities({
      collection: 'deadLetters',
      entity: type<ErrorResponseEntity>(),
    }),
    withReducer(
      on(outboxEvents.responseHadError, ({ payload }) =>
        setEntity(payload, { collection: 'deadLetters' }),
      ),
      on(outboxEvents.errorCleared, ({ payload }) =>
        removeEntity(payload.errorId, {
          collection: 'deadLetters',
        }),
      ),
    ),
  );
}
