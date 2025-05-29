import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'outbox-demo',
    loadChildren: () =>
      import('../outbox-demo/routes').then((m) => m.OUTBOX_DEMO_ROUTES),
  },
];
