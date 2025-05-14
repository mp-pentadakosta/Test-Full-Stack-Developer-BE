import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class GamesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getGames(data: { page: number; limit: number }) {
    const offset = (data.page - 1) * data.limit;
    const games = await this.prismaService.games.findMany({
      skip: offset,
      take: data.limit,
    });
    const totalCount = await this.prismaService.games.count();
    return {
      page: data.page,
      limit: data.limit,
      totalCount,
      data: games,
    };
  }

  async getGameDetail(id: number) {
    const game = await this.prismaService.games.findUnique({
      where: { id },
    });
    if (!game) {
      throw new Error('Game not found');
    }
    return game;
  }

  async getSearch(search: string) {
    return this.prismaService.games.findMany({
      where: {
        OR: [{ name: { contains: search } }],
      },
    });
  }

  async getPopularGames(): Promise<any> {
    return this.prismaService.gamesPopular.findMany();
  }
}
