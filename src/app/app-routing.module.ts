import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountrydetailComponent } from './pages/countrydetail/countrydetail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path : 'country/:countryName',
    component : CountrydetailComponent
  },

  {
    path : 'not-found',
    component : NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
