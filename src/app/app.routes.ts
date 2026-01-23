import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { adminGuard } from './core/auth/admin.guard';
import { buyerGuard } from './core/auth/buyer.guard';
import { agentGuard } from './core/auth/agent.guard';
import { PrivateLayoutComponent } from './core/layout/private-layout/private-layout';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout';
import { RegisterComponent } from './features/auth/register.component/register.component';
import { OauthCallbackComponent } from './features/auth/callback.component/callback.component';
import { LoginComponent } from './features/auth/login.component/login.component';
import { BillingCancelComponent } from './features/billing/billing-cancel.component/billing-cancel.component';
import { BillingSuccessComponent } from './features/billing/billing-success.component/billing-success.component';
import { PricingComponent } from './features/billing/pricing.component/pricing.component';
import { AdminAnalyticsComponent } from './features/admin/admin-analytics.component/admin-analytics.component';
import { DashboardComponent } from './features/dashboard/dashboard.component/dashboard.component';
import { BuyerDashboardComponent } from './features/dashboard/buyer-dashboard.component/buyer-dashboard.component';
import { AgentDashboardComponent } from './features/dashboard/agent-dashboard.component/agent-dashboard.component';
import { AddressAutocompleteComponent } from './shared/components/address-autocomplete.component/address-autocomplete.component';
import { SelectLocation } from './shared/components/select-location/select-location';
import { LocationGuard } from './core/auth/location.guard';
import { AdminUsersComponent } from './features/admin/admin-users.component/admin-users.component';
import { AustinDashboardComponent } from './features/market/us/austin/austin-dashboard.component';

export const routes: Routes = [
  // Public routes with public layout
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'auth/callback', component: OauthCallbackComponent },
      { path: 'pricing', component: PricingComponent }
    ]
  },
  {
    path: 'select-location',
    component: SelectLocation,
    canActivate: [authGuard] // Must be authenticated to select location
  },
  // Protected routes with private layout
  {
    path: '',
    component: PrivateLayoutComponent,

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
          {
            path: 'buyer',
            component: BuyerDashboardComponent,
            canActivate: [buyerGuard, LocationGuard]
          },
          {
            path: 'agent',
            component: AgentDashboardComponent,
            canActivate: [agentGuard, LocationGuard]
          },
          {
            path: 'admin',
            component: AdminUsersComponent,
            canActivate: [adminGuard]
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'buyer' // TEMP fallback - will be redirected by guards
          },
          // {
          //   path: 'dashboard',
          //   loadComponent: () =>
          //     import('./features/dashboard/buyer-dashboard.component/buyer-dashboard.component')
          //       .then(m => m.BuyerDashboardComponent)
          // },
          {
            path: 'properties',
            loadComponent: () =>
              import('./features/property/property-search.component/property-search.component')
                .then(m => m.PropertySearchComponent)
          },
          {
            path: 'properties/:id',
            loadComponent: () =>
              import('./features/property/property-details.component/property-details.component')
                .then(m => m.PropertyDetailsComponent)
          },
          {
            path: 'billing/success',
            component: BillingSuccessComponent
          },
          {
            path: 'billing/cancel',
            component: BillingCancelComponent
          }
        ]
      },

      // Admin routes (heavily protected)
      {
        path: 'admin',

        loadComponent: () =>
          import('./features/admin/admin-users.component/admin-users.component')
            .then(m => m.AdminUsersComponent)
      },
      {
        path: 'admin/analytics',
        canActivate: [adminGuard],
        component: AdminAnalyticsComponent
      },
      {
        path: 'market/austin',
        component: AustinDashboardComponent,
        canActivate: [authGuard]
      },  
    ]
  },
  // Fallback
  { path: '**', redirectTo: 'login' }
];
