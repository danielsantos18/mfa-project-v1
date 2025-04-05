import { Routes } from '@angular/router';
import { SaveListComponent } from './features/saves/components/save-list/save-list.component';

export const SAVE_ROUTES: Routes = [
  {
    path: 'saves',
    component: SaveListComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'saves',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'saves',
    pathMatch: 'full'
  }
];
