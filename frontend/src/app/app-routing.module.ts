import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DxLoginComponent } from './dx-login/dx-login/dx-login.component';
import { BoldLoginComponent } from './bold-login/bold-login/bold-login.component';

const routes: Routes = [
  { path: '', component: DxLoginComponent },
  { path: 'bold', component: BoldLoginComponent },
  { path: 'export', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
