import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class UserRoutesGuard implements CanActivate {
  constructor(private token: TokenStorageService, private router: Router) {};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const token = this.token.getToken();
    if(!!token){
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }
}
