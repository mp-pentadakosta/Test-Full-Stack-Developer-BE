import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class PrefixRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllPrefixByIdGame(idGame: number) {
    return this.prismaService.prefixCode.findMany({
      where: {
        gameId: idGame,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findPrefixById(id: number) {
    return this.prismaService.prefixCode.findUnique({
      where: {
        id: id,
      },
    });
  }
}
