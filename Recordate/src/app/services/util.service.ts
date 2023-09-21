import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private router: Router) { }

  // LocalStorage
  setElementInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getElementInLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

   // Router
   routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }
}
