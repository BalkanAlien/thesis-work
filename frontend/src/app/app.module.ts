import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DxLoginComponent } from './dx-login/dx-login/dx-login.component';
import { BoldLoginComponent } from './bold-login/bold-login/bold-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestfolderComponent } from './main/testfolder/testfolder.component';
import { SubfolderComponent } from './main/subfolder/subfolder.component';
import { InterestingComponent } from './main/interesting/interesting.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DxLoginComponent,
    BoldLoginComponent,
    TestfolderComponent,
    SubfolderComponent,
    InterestingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
