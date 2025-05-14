import { Controller, HttpCode, Post, Body, Param, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddOrderDto, UpdatePaymentDto } from '../dto/order.dto';
import { OrderService } from '../services/order.service';
import { CustomHttpException } from '../core/custom.http.exception';
import { errors } from '../error/error';
import { SocketGateway } from '../socket/socket.gateway';

@ApiTags('Order Controller')
@ApiBearerAuth('access-token')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Post('add/:idGame')
  @HttpCode(200)
  async addOrder(@Body() body: AddOrderDto, @Param('idGame') idGame: number) {
    if (!idGame) {
      throw new CustomHttpException(errors.INTERNAL_SERVER_ERROR, {
        message: 'Game not found',
        description: 'Game not found',
      });
    }
    return this.orderService.createOrder(idGame, body);
  }

  @Get('invoice/:invoice')
  @HttpCode(200)
  async getDetail(@Param('invoice') invoice: string) {
    if (!invoice) {
      throw new CustomHttpException(errors.INTERNAL_SERVER_ERROR, {
        message: 'Invoice not found',
        description: 'Invoice not found',
      });
    }

    this.socketGateway.sendOrderCreatedEvent();
    return this.orderService.getOrderByInvoice(invoice);
  }

  @Post('payment')
  @HttpCode(200)
  async payment(@Body() body: UpdatePaymentDto) {
    return this.orderService.updatePaymentStatus(body);
  }
}
