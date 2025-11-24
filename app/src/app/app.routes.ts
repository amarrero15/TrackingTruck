import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'rutas',
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
  {
    path: 'rutas',
    loadComponent: () => import('./driver-route/pages/routes/routes.page').then( m => m.RoutesPage)
  },

  {
    path: 'conductores',
    loadComponent: () => import('./drivers/pages/drivers/drivers.page').then( m => m.DriversPage)
  },
  {
    path: 'vehiculos',
    loadComponent: () => import('./cars/pages/cars/cars.page').then( m => m.CarsPage)
  },
];
