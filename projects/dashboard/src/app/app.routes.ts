import { SAVE_ROUTES } from './../../../saves/src/app/app.routes';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mfe-products',
    loadChildren: () => loadRemoteModule('products', './Routes').then(m => m.PRODUCTS_ROUTES),
  },
  {
    path: 'mfe-saves',
    loadChildren: () => loadRemoteModule('saves', './Routes').then(m => m.SAVE_ROUTES),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
