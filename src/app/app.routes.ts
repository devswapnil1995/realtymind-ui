import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { authGuard } from './core/auth/auth.guard';
import { PrivateLayoutComponent } from './core/layout/private-layout/private-layout';
import { Dashboard } from './features/dashboard/dashboard';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout';
import { RegisterComponent } from './features/auth/register.component/register.component';
import { OauthCallbackComponent } from './features/auth/callback.component/callback.component';
import { LoginComponent } from './features/auth/login.component/login.component';
import { PropertySearchComponent } from './features/property/property-search.component/property-search.component';
import { PropertyDetailsComponent } from './features/property/property-details.component/property-details.component';
import { AuthService } from './core/auth/auth.service';

export const routes: Routes = [

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'auth/callback', component: OauthCallbackComponent }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'dashboard',
  //   component: Dashboard
  // },
  {
    path: 'dashboard',
    loadComponent: () => {
      const authService = inject(AuthService);
      return authService.role === 'Agent'
        ? import('../app/features/dashboard/agent-dashboard.component/agent-dashboard.component')
          .then(m => m.AgentDashboardComponent)
        : import('../app/features/dashboard/buyer-dashboard.component/buyer-dashboard.component')
          .then(m => m.BuyerDashboardComponent);
    }
  },
  {
    path: 'properties',
    loadComponent: () =>
      import('../app/features/property/property-search.component/property-search.component')
        .then(m => m.PropertySearchComponent),
    canActivate: [authGuard]
  },
  {
    path: 'properties/:id',
    loadComponent: () =>
      import('../app/features/property/property-details.component/property-details.component')
        .then(m => m.PropertyDetailsComponent),
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: '' }
];
