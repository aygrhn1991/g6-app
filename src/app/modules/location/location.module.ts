import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocationPage } from './location.page';
import { TrackPage } from './track/track.page';

const routes: Routes = [
  { path: '', component: LocationPage },
  { path: 'track', component: TrackPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LocationPage,
    TrackPage,
  ]
})
export class LocationPageModule { }
