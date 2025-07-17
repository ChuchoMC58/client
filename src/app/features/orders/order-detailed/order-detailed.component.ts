import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../shared/models/order';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { PaymentPipe } from "../../../shared/pipes/payment.pipe";
import { AddressPipe } from "../../../shared/pipes/address.pipe";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-detailed',
  imports: [
    MatCardModule,
    MatButton,
    DatePipe,
    CurrencyPipe,
    PaymentPipe,
    AddressPipe,
    RouterLink
],
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.scss'
})
export class OrderDetailedComponent {
  private orderService = inject(OrderService);
  private activatedRoute = inject(ActivatedRoute);
  order?: Order;

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;
    this.orderService.getOrderDetailed(+id).subscribe({
      next: order => {
        this.order = order;
      }
    });
  }
}
