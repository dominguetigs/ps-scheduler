import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'scheduler',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'scheduler',
    loadChildren: () => import('./pages/scheduler/scheduler.module').then((m) => m.SchedulerModule),
    data: {
      title: 'Scheduler',
    },
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
