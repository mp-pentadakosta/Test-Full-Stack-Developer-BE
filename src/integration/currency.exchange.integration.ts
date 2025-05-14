import { Injectable, Logger } from '@nestjs/common';
import { AxiosInterceptorCore } from '../core/axios.interceptor.core';
import { CustomHttpException } from '../core/custom.http.exception';
import { errors } from 'src/error/error';
import { ConvertModelExchangeRate } from '../dto/model.currency.exchange.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CurrencyExchangeIntegration {
  constructor(private readonly axiosInstance: AxiosInterceptorCore) {}

  async getExchangeRate(symbols: string) {
    try {
      const axios = await this.axiosInstance.axiosRequest();

      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_KEY}/latest/${symbols}`,
      );

      return ConvertModelExchangeRate.toModelExchangeRate(
        JSON.stringify(response.data),
      );
    } catch (e) {
      Logger.error(e);
      throw new CustomHttpException(errors.INVALID_REQUEST_DATA, {
        message: 'Invalid request data to get exchange rate',
      });
    }
  }
}
