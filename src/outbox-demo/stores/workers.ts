import {
  patchState,
  signalStore,
  withComputed,
  withFeature,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';

import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';
import { withOutbox } from '@hypertheory/ng-outbox';
export type WorkerEntity = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
};
export const workerStore = signalStore(
  withEntities<WorkerEntity>(),
  withComputed((store) => {
    return {
      sortedWorkers: computed(() => {
        return store
          .entities()
          .sort((a, b) => a.lastName.localeCompare(b.lastName))
          .sort((a, b) => a.firstName.localeCompare(b.firstName));
      }),
    };
  }),
  withMethods((store) => {
    const client = inject(HttpClient);
    return {
      _load: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            client.get<WorkerEntity[]>('/api/workers').pipe(
              tapResponse(
                (workers) => patchState(store, setAllEntities(workers)),
                (error) => console.error('Failed to load workers:', error),
              ),
            ),
          ),
        ),
      ),
    };
  }),
  withFeature((store) => withOutbox('workers', store.sortedWorkers)),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
