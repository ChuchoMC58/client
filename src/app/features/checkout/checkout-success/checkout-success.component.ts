import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PaymentPipe } from '../../../shared/pipes/payment.pipe';
import { AddressPipe } from '../../../shared/pipes/address.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SignalrService } from '../../../core/services/signalr.service';
import { inject } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatProgressSpinnerModule,
    DatePipe,
    AddressPipe,
    PaymentPipe,
    CurrencyPipe
  ],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss'
})
export class CheckoutSuccessComponent {
  signalrService = inject(SignalrService);
  orderService = inject(OrderService);

  ngOnDestroy(): void {
    this.orderService.orderComplete = false;
    this.signalrService.orderSignal.set(null);
  }
  
}
