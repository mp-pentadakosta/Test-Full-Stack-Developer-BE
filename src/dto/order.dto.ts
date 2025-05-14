import { ApiProperty } from '@nestjs/swagger';
import {
  PaymentMethod,
  StatusPayment,
  StatusTransaction,
} from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currencyCode: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idGameUser: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  serverGame: string;
  @ApiProperty({ enum: PaymentMethod })
  @IsNotEmpty()
  @IsEnum(PaymentMethod, {
    message: 'paymentMethod must be a valid PaymentMethod',
  })
  paymentMethod: PaymentMethod;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  prefixCodeId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  priceExchange: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  waNumber: string;
}

export class UpdatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  invoice: string;
  @ApiProperty({ enum: StatusTransaction })
  @IsNotEmpty()
  @IsEnum(StatusTransaction, {
    message: 'statusTransaction must be a valid StatusTransaction',
  })
  statusTransaction: StatusTransaction;
  @ApiProperty({ enum: StatusPayment })
  @IsNotEmpty()
  @IsEnum(StatusPayment, {
    message: 'statusPayment must be a valid StatusPayment',
  })
  paymentStatus: StatusPayment;
}
