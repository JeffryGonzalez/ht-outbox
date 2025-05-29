import { signalStoreFeature, type } from '@ngrx/signals';
import { EntityState } from '@ngrx/signals/entities';
import { withReducer } from '@ngrx/signals/events';

export function withOutboxReducer<T>() {
  return signalStoreFeature(
    {
      state: type<EntityState<T>>(),
    },
    withReducer(),
  );
}
