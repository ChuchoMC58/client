import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map, of } from 'rxjs';
import { Cart } from '../../shared/models/cart';
import { CartService } from '../services/cart.service';
import { SnackbarService } from '../services/snackbar.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const cartService = inject(CartService);
  const router = inject(Router);
 
  if (accountService.currentUser()) {
      return of(true);
    } else {
      return accountService.getAuthState().pipe(
        map(authState => {
          if (authState.isAuthenticated) {
            return true;
          } else {
            router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
            return false;
          }
        }
      ));
    }
};
