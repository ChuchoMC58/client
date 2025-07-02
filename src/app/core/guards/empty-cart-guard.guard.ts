import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { SnackbarService } from '../services/snackbar.service';
import { inject } from '@angular/core';

export const emptyCartGuardGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);
  const snack = inject(SnackbarService);

  if (!cartService.cart() || cartService.cart()?.items.length === 0) {
    snack.error('Your cart is empty. Please add items to your cart before proceeding.');
    router.navigateByUrl('/cart');
    return false;
  }
  return true;
};
