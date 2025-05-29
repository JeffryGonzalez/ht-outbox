import { signalStore, withState } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import {
  withDeadLetterReducer,
  withOutboxReducer,
} from './outbox-store-reducer';
import { ErrorResponseEntity, RequestEntity } from './types';

export const OutboxStore = signalStore(
  withEntities<RequestEntity>(),
  withState({
    deadLetters: [] as ErrorResponseEntity[],
  }),
  withOutboxReducer(),
  withDeadLetterReducer(),
);
