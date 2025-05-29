import { Routes } from '@angular/router';
import { OutboxDemo } from './outbox-demo';
export const OUTBOX_DEMO_ROUTES: Routes = [
  {
    path: '',
    component: OutboxDemo,
    children: [],
  },
];
