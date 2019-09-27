import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilService } from './services/util.service';
import { ToastService } from './services/toast.service';
import { HttpService } from './services/http.service';
import { UserService } from './services/user.service';
import { ChartService } from './services/chart.service';
import { InterceptorService } from './services/interceptor.service';
import { AlertService } from './services/alert.service';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx'; 
import { AppVersion } from '@ionic-native/app-version/ngx'; 
import { File } from '@ionic-native/file/ngx';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UtilService,
    ToastService,
    AlertService,
    HttpService,
    UserService,
    ChartService,
    AppVersion,
    FileOpener,
    FileTransfer,
    File,
    { provide: 'API_URL', useValue: 'http://www.fenglingtime.com/appserver' },
    //{ provide: 'API_URL', useValue: 'http://localhost:8080/appserver' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
