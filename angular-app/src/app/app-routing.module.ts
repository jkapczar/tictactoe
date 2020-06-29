import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PregameComponent} from './pregame/pregame.component';


const routes: Routes = [
  {path: '', redirectTo: '/pregame', pathMatch: 'full'},
  {path: 'pregame', component: PregameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
