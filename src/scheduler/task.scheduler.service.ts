import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'nestjs-prisma';
import { StatusPayment, StatusTransaction } from '@prisma/client';

@Injectable()
export class TaskSchedulerService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(TaskSchedulerService.name);

  // @Cron('*/10 * * * *')
  @Cron('*/5 * * * * *')
  async retryFailedPayments() {
    Logger.log('Running retryFailedPayments task...');
    const failedTransactions = await this.prisma.transaction.findMany({
      where: {
        statusPayment: StatusPayment.UNPAID,
      },
    });

    for (const tx of failedTransactions) {
      const success = Math.random() < 0.7; //simulate a 70% success rate

      if (success) {
        await this.prisma.transaction.update({
          where: { id: tx.id },
          data: {
            statusPayment: 'PAID',
          },
        });
      } else {
        await this.prisma.transaction.update({
          where: { id: tx.id },
          data: {
            statusPayment: 'UNPAID',
          },
        });
      }
    }
  }

  // @Cron('*/10 * * * *')
  @Cron('*/5 * * * * *')
  async retryFailedTransaction() {
    Logger.log('Running retryFailedTransaction task...');
    const failedTransactions = await this.prisma.transaction.findMany({
      where: {
        status: StatusTransaction.FAILED,
      },
    });

    for (const tx of failedTransactions) {
      const success = Math.random() < 0.7; //simulate a 70% success rate

      if (success) {
        await this.prisma.transaction.update({
          where: { id: tx.id },
          data: {
            status: StatusTransaction.SUCCESS,
          },
        });
      } else {
        await this.prisma.transaction.update({
          where: { id: tx.id },
          data: {
            status: StatusTransaction.FAILED,
          },
        });
      }
    }
  }
}
