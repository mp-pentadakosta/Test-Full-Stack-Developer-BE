import { Injectable } from '@nestjs/common';
import { GamesRepository } from '../repository/games.repository';
import { ResponseSuccess } from '../core/dto/response';
import { CustomHttpException } from '../core/custom.http.exception';
import { errors } from '../error/error';

@Injectable()
export class GamesService {
  constructor(private readonly gameRepository: GamesRepository) {}

  async getGames(page: number, limit: number): Promise<any> {
    const resp = await this.gameRepository.getGames({
      page: page,
      limit: limit,
    });

    return ResponseSuccess.success({
      listData: resp.data.map((item) => {
        return {
          ...item,
        };
      }),
    });
  }

  async getGameDetail(id: number): Promise<any> {
    const resp = await this.gameRepository.getGameDetail(id);
    if (!resp) {
      throw new CustomHttpException(errors.FAILED_GET_DATA, {
        message: 'Game not found',
        description: 'Game not found',
      });
    }

    return ResponseSuccess.success({
      data: resp,
    });
  }

  async getSearch(search: string): Promise<any> {
    const resp = await this.gameRepository.getSearch(search);
    return ResponseSuccess.success({
      listData: resp.map((item) => {
        return {
          ...item,
        };
      }),
    });
  }
}
