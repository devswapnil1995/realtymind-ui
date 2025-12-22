import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout';
import { HomeComponent } from './features/home/home';
import { PrivateLayoutComponent } from './core/layout/private-layout/private-layout';
import { DashboardComponent } from './features/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
