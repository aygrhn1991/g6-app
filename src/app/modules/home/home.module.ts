import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { CustomPage } from './custom/custom.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'custom/:type', component: CustomPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage,
    CustomPage
  ]
})
export class HomePageModule { }
