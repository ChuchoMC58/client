import { Component, inject } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/models/order';
import { RouterLink } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [
    RouterLink,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  private orderService = inject(OrderService);
  orders: Order[] = [];

  ngOnInit(): void {
    this.orderService.getOrdersForUser().subscribe({
      next: orders => {
        this.orders = orders;
      }
    });
  }
}
