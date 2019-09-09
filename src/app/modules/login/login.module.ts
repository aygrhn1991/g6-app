import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { RegisterPage } from './register/register.page';

const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'register', component: RegisterPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginPage,
    RegisterPage
  ]
})
export class LoginPageModule { }
