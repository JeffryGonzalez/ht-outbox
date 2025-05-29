import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav class="bg-gray-800 text-white flex flex-row gap-4 p-4">
      <a
        routerLink="/"
        class="text-white hover:text-gray-300 ml-4"
        [routerLinkActive]="['underline']"
        [routerLinkActiveOptions]="{ exact: true }"
        >Home</a
      >
      <a
        routerLink="/outbox-demo"
        class="text-white hover:text-gray-300"
        [routerLinkActive]="['underline']"
        >Outbox Demo</a
      >
    </nav>

    <main class="container mx-auto p-4">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
})
export class AppComponent {}
