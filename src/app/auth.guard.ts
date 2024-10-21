import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./services/auth.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  let router = inject(Router);
  const userRole = authService.getUserRole();
  const isTryingToAccessAdmin = state.url.includes('/admin');
  if (authService.isLoggedIn()) {
    if (isTryingToAccessAdmin && userRole !== 'admin') {
      router.navigate(['/feedback']);
      return false;
    }
    return true;
  } else {
    router.navigate(['/login']);
    return false;

  }
}
