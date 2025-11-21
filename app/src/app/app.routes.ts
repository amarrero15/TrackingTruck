import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'autenticacion',
    loadComponent: () => import('./auth/pages/auth-page/auth-page.page').then( m => m.AuthPagePage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'nueva-ruta',
    loadComponent: () => import('./driver-route/pages/new-route/new-route.page').then( m => m.NewRoutePage)
  },
];
