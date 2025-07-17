import { Pipe, PipeTransform } from '@angular/core';
import { ConfirmationToken } from '@stripe/stripe-js';
import { PaymentSummary } from '../models/order';

@Pipe({
  name: 'payment',
  standalone: true
})

export class PaymentPipe implements PipeTransform {
  transform(value?: ConfirmationToken['payment_method_preview'] | PaymentSummary, ...args: unknown[]): string {
    if(value && 'card' in value){
      const {brand, last4, exp_month, exp_year} = 
        (value as ConfirmationToken['payment_method_preview']).card!;
      return `${brand.toUpperCase()} **** **** **** ${last4}, Exp: ${exp_month}/${exp_year}`;
    } else if(value && 'last4' in value){
      const {brand, last4, expMonth, expYear} = value as PaymentSummary;
      return `${brand.toUpperCase()} **** **** **** ${last4}, Exp: ${expMonth}/${expYear}`;
    } else {
      return 'Unknown Payment Details';
    }
  }
}

// const card = value;
//     if (!card) return 'Unknown Payment Details';

//     const brand = card.brand.toUpperCase() || 'Card';
//     const last4 = card.last4 || card.number?.slice(-4) || '****';
//     const maskedNumber = `**** **** **** ${last4}`;
//     let expiry = '';
//     if (card.exp_month && card.exp_year) {
//       expiry = `Exp: ${card.exp_month.toString().padStart(2, '0')}/${card.exp_year.toString().slice(-2)}`;
//     }
//     return `${brand} ${maskedNumber}${expiry ? ', ' + expiry : ''}`;
