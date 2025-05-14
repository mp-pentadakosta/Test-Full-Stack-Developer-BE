import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyUtils {
  formatCurrency(value: number): string {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    });
  }

  formatCurrencyWithFractionDigits(value: number): string {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  }

  parseCurrency(value: string): number {
    return Number(value.replace(/[^0-9]/g, ''));
  }

  convertCurrency(data: { amount: number; from: number; to: number }): number {
    const from = data.from;
    const to = data.to;

    const usd = data.amount / from;
    const sgd = usd * to;

    return parseFloat(sgd.toFixed(4));
  }
}
