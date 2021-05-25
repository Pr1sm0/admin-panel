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
export class AdminRoutesGuard implements CanActivate {
  constructor(private token: TokenStorageService, private router: Router) {};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const token = this.token.getToken();
    const userRole = this.token.getUser().role;
    if(!!token && userRole === 'admin'){
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }
}
