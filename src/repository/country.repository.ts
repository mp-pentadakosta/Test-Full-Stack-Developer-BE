import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class CountryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllCountry() {
    return this.prismaService.country.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async findCountryByCurrencyCode(currencyCode: string) {
    return this.prismaService.country.findUnique({
      where: {
        currencyCode: currencyCode,
      },
    });
  }
}
