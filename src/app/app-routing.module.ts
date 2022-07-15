import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ContactComponent } from './components/contact/contact.component';
import { DolarComponent } from './components/dolar/dolar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', component: InfoComponent },
  { path: 'inflacion', component: StatisticsComponent },
  { path: 'dolar', component: DolarComponent },
  { path: 'baseMonetaria', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
