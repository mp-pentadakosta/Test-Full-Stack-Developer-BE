import { Injectable } from '@nestjs/common';
import { PrefixRepository } from '../repository/prefix.repository';
import { ResponseSuccess } from '../core/dto/response';
import { CurrencyExchangeIntegration } from '../integration/currency.exchange.integration';

@Injectable()
export class PrefixService {
  constructor(
    private readonly prefixCodeRepository: PrefixRepository,
    private readonly currencyExchangeIntegration: CurrencyExchangeIntegration,
  ) {}

  async getAllPrefixByIdGame(idGame: number) {
    const resp = await this.prefixCodeRepository.findAllPrefixByIdGame(idGame);

    const getExchangeRate =
      await this.currencyExchangeIntegration.getExchangeRate('IDR');

    return ResponseSuccess.success({
      exchangeRate: {
        idr: {
          price: getExchangeRate.conversion_rates.IDR,
          code: 'IDR',
          id: 'ID',
        },
        sgd: {
          price: getExchangeRate.conversion_rates.SGD,
          code: 'SGD',
          id: 'SG',
        },
        php: {
          price: getExchangeRate.conversion_rates.PHP,
          code: 'PHP',
          id: 'PH',
        },
        myr: {
          price: getExchangeRate.conversion_rates.MYR,
          code: 'MYR',
          id: 'MY',
        },
        thb: {
          price: getExchangeRate.conversion_rates.THB,
          code: 'THB',
          id: 'TH',
        },
      },
      listData: resp,
    });
  }
}
