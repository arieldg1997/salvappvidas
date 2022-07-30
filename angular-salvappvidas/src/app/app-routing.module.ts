import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentersComponent } from './centers/centers.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DonationsComponent } from './donations/donations.component';
import { HomeComponent } from './home/home.component';
import { MoreInfoComponent } from './more-info/more-info.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'centros',
    component: CentersComponent,
  },
  {
    path: 'donaciones',
    component: DonationsComponent,
  },
  {
    path: 'configuracion',
    component: ConfigurationComponent,
  },
  {
    path: 'info',
    component: MoreInfoComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
