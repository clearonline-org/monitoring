/**
* @Author: mars
* @Date:   2016-12-28T00:43:45-05:00
* @Last modified by:   mars
* @Last modified time: 2017-01-18T01:21:41-05:00
*/



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CountdownComponentComponent } from './countdown-component/countdown-component.component';

// modules
import { MaterialModule } from '@angular/material';
import {MomentModule} from 'angular2-moment';
import { MapComponentComponent } from './map-component/map-component.component';
import { AmmapViewComponent } from './ammap-view/ammap-view.component';
import { AmnetworkViewComponent } from './amnetwork-view/amnetwork-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponentComponent,
    MapComponentComponent,
    AmmapViewComponent,
    AmnetworkViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
