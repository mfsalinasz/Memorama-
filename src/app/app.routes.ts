import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'dificultad',
    loadComponent: () => import('./dificultad/dificultad.page').then(m => m.DificultadPage),
  },
  {
    path: 'juego',
    loadComponent: () => import('./juego/juego.page').then(m => m.JuegoPage),
  },
  {
    path: 'victoria',
    loadComponent: () => import('./victoria/victoria.page').then(m => m.VictoriaPage),
  },
];
