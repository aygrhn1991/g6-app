import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class BindGuard implements CanActivate {
  constructor(private router: Router,
    private user: UserService,
    private util: UtilService,
    private toast: ToastService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if (this.util.isNull(this.user.user.vin)) {
    //   this.toast.presentToast('请绑定车辆');
    //   this.router.navigate(['/tabs/user']);
    //   return false;
    // }
    return true;
  }

}
