import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DxLoginComponent } from './dx-login/dx-login/dx-login.component';
import { BoldLoginComponent } from './bold-login/bold-login/bold-login.component';
import { TestfolderComponent } from './main/testfolder/testfolder.component';
import { SubfolderComponent } from './main/subfolder/subfolder.component';
import { InterestingComponent } from './main/interesting/interesting.component';

const routes: Routes = [
  { path: '', component: DxLoginComponent },
  { path: 'bold', component: BoldLoginComponent },
  { path: 'export', component: MainComponent },
  { path: 'export/Testfolder', component: TestfolderComponent },
  { path: 'export/Testfolder/Subfolder', component: SubfolderComponent },
  { path: 'export/Testfolder/Subfolder/Interesting', component: InterestingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
