import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,

  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.firebaseSvc.getAuthState().pipe(map(auth => {
        // No existe usuario autenticado
        if (!auth) {
          return true;
        } else {
          // Existe usuario autenticado
          this.utilsSvc.RouterLink('/tabs/home'); // Redirige a home-page si está autenticado
          return false;
        }
      }));
  }
}
