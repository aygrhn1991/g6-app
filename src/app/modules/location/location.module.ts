import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocationPage } from './location.page';
import { TrackPage } from './track/track.page';
import { Track2Page } from './track2/track2.page';

const routes: Routes = [
  { path: '', component: LocationPage },
  { path: 'track', component: TrackPage },
  { path: 'track2', component: Track2Page }
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
    Track2Page
  ]
})
export class LocationPageModule { }
