import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'autenticacion',
    loadComponent: () => import('./auth/pages/auth-page/auth-page.page').then( m => m.AuthPagePage)
  },
];
