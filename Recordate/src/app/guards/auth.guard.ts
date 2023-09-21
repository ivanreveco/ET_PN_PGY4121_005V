import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from '../services/util.service';

@Injectable({
  providedIn: 'root'
})



export class AuthGuard implements CanActivate {
  constructor(private utilsvc: UtilService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.utilsvc.getElementInLocalStorage('user');
    
        // Existe usuario autenticado
        if(user) {
          return true;
        } else {
          // No existe usuario autenticado
          this.utilsvc.routerLink('/home');
          return false;
        }
  }
  
}
