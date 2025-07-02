import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payment',
  standalone: true
})

export class PaymentPipe implements PipeTransform {
  transform(value?: any, ...args: unknown[]): string {
    const card = value;
    if (!card) return 'Unknown Payment Details';

    const brand = card.brand.toUpperCase() || 'Card';
    const last4 = card.last4 || card.number?.slice(-4) || '****';
    const maskedNumber = `**** **** **** ${last4}`;
    let expiry = '';
    if (card.exp_month && card.exp_year) {
      expiry = `Exp: ${card.exp_month.toString().padStart(2, '0')}/${card.exp_year.toString().slice(-2)}`;
    }
    return `${brand} ${maskedNumber}${expiry ? ', ' + expiry : ''}`;
  }
}
