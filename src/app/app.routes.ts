import { Routes } from '@angular/router';
import { PUBLIC_ROUTES } from './pages/public/public.routes';
import { AUTH_ROUTES } from './pages/auth/auth.routes';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/full/full.component').then(m => m.FullComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/public/public.routes').then(m => m.PUBLIC_ROUTES)
      }
    ]
  },
  ...AUTH_ROUTES,
  { 
    path: 'dashboard', 
    loadComponent: () => import('./pages/private/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard] 
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];