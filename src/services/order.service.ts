import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { AddOrderDto, UpdatePaymentDto } from '../dto/order.dto';
import { PrefixRepository } from '../repository/prefix.repository';
import { CustomHttpException } from '../core/custom.http.exception';
import { errors } from '../error/error';
import { CountryRepository } from '../repository/country.repository';
import { ResponseSuccess } from '../core/dto/response';
import { CurrencyExchangeIntegration } from '../integration/currency.exchange.integration';
import { GamesRepository } from '../repository/games.repository';
import { SocketGateway } from '../socket/socket.gateway';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly prefixCodeRepository: PrefixRepository,
    private readonly countryRepository: CountryRepository,
    private readonly currencyExchangeIntegration: CurrencyExchangeIntegration,
    private readonly gameRepository: GamesRepository,
    private readonly socketGateway: SocketGateway,
  ) {}

  generateInvoice(): string {
    const prefix = 'INV';
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);

    return `${prefix}-${timestamp}-${random.toString().padStart(4, '0')}`;
  }

  async createOrder(gameId: number, body: AddOrderDto): Promise<any> {
    const getPrefixCode = await this.prefixCodeRepository.findPrefixById(
      body.prefixCodeId,
    );

    if (!getPrefixCode) {
      throw new CustomHttpException(errors.FAILED_GET_DATA, {
        message: 'Prefix code not found',
        description: 'Prefix code not found',
      });
    }

    const getCountryRepository =
      await this.countryRepository.findCountryByCurrencyCode(body.currencyCode);

    if (!getCountryRepository) {
      throw new CustomHttpException(errors.FAILED_GET_DATA, {
        message: 'Country not found',
        description: 'Country not found',
      });
    }

    const getExchangeRate =
      await this.currencyExchangeIntegration.getExchangeRate('IDR');

    if (
      body.priceExchange !==
      getExchangeRate.conversion_rates[getCountryRepository.currencyCode]
    ) {
      throw new CustomHttpException(errors.FAILED_GET_DATA, {
        message: 'Price exchange not match',
        description: 'Price exchange not match',
      });
    }

    const resp = await this.orderRepository.addOrder({
      usernameGame: body.username,
      gameId: gameId,
      currencyCode: body.currencyCode,
      priceExchange:
        getExchangeRate.conversion_rates[getCountryRepository.currencyCode],
      idGameUser: body.idGameUser,
      paymentMethod: body.paymentMethod,
      prefixCodeId: body.prefixCodeId,
      serverGame: body.serverGame,
      waNumber: body.waNumber,
      fee: getPrefixCode.fee,
      price: getPrefixCode.price,
      total: getPrefixCode.price + getPrefixCode.fee,
      invoice: this.generateInvoice(),
    });

    return ResponseSuccess.success({
      data: resp,
    });
  }

  async getOrderByInvoice(invoice: string) {
    const resp = await this.orderRepository.getOrderByInvoice(invoice);

    if (!resp) {
      throw new CustomHttpException(errors.FAILED_GET_DATA, {
        message: 'Order not found',
        description: 'Order not found',
      });
    }

    const getGameInformation = await this.gameRepository.getGameDetail(
      resp.gameId,
    );

    if (!getGameInformation) {
      throw new CustomHttpException(errors.FAILED_GET_DATA, {
        message: 'Game not found',
        description: 'Game not found',
      });
    }

    return ResponseSuccess.success({
      data: {
        accountInformation: {
          idGameUser: resp.idGameUser,
          serverGame: resp.serverGame,
          username: resp.usernameGame,
        },
        gameInformation: {
          name: getGameInformation.name,
          image: getGameInformation.image,
          publisher: getGameInformation.publisher,
        },
        orderInformation: {
          price: resp.price,
          fee: resp.fee,
          total: resp.total,
          paymentMethod: resp.paymentMethod,
          invoice: resp.invoice,
          currencyCode: resp.currencyCode,
          priceExchange: resp.priceExchange,
          statusPayment: resp.statusPayment,
          statusTransaction: resp.status,
        },
      },
    });
  }

  async updatePaymentStatus(body: UpdatePaymentDto) {
    const resp = await this.orderRepository.updatePaymentStatus(body.invoice, {
      paymentStatus: body.paymentStatus,
      transactionStatus: body.statusTransaction,
    });

    if (!resp) {
      throw new CustomHttpException(errors.FAILED_GET_DATA, {
        message: 'Order not found',
        description: 'Order not found',
      });
    }

    this.socketGateway.emitTransactionStatus(resp.invoice, {
      statusPayment: resp.statusPayment,
      statusTransaction: resp.status,
    });
  }
}
