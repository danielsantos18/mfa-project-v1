import { Routes } from '@angular/router';
import { CocktailComponent } from './features/cocktails/components/cocktail.component';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: 'products',
    component: CocktailComponent,
    children: [
      {
        path: "list",
        loadComponent: () => import('./features/cocktails/components/cocktail-list/cocktail-list.component').then(m => m.CocktailListComponent)
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./features/cocktails/components/cocktail-details/cocktail-details.component').then(m => m.CocktailDetailsComponent)
      }
    ]
  },
  {
    path: "",
    redirectTo: "products",
    pathMatch: "full"
  }
];

