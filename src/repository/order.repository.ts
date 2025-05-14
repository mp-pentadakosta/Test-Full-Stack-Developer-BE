import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import {
  PaymentMethod,
  StatusPayment,
  StatusTransaction,
} from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async addOrder(data: {
    gameId: number;
    currencyCode: string;
    priceExchange: number;
    idGameUser: string;
    paymentMethod: PaymentMethod;
    prefixCodeId: number;
    usernameGame: string;
    serverGame: string;
    userId?: number;
    waNumber: string;
    invoice: string;
    fee: number;
    price: number;
    total: number;
  }) {
    return this.prismaService.transaction.create({
      data: {
        gameId: data.gameId,
        currencyCode: data.currencyCode,
        priceExchange: data.priceExchange,
        idGameUser: data.idGameUser,
        paymentMethod: data.paymentMethod,
        prefixCodeId: data.prefixCodeId,
        serverGame: data.serverGame,
        userId: data.userId,
        waNumber: data.waNumber,
        fee: data.fee,
        price: data.price,
        total: data.total,
        invoice: data.invoice,
        usernameGame: data.usernameGame,
      },
    });
  }

  async getOrderByInvoice(invoice: string) {
    return this.prismaService.transaction.findFirst({
      where: {
        invoice: invoice,
      },
    });
  }

  async updatePaymentStatus(
    invoice: string,
    data: {
      paymentStatus: StatusPayment;
      transactionStatus: StatusTransaction;
    },
  ) {
    return this.prismaService.transaction.update({
      where: {
        invoice: invoice,
      },
      data: {
        status: data.transactionStatus,
        statusPayment: data.paymentStatus,
      },
    });
  }
}
