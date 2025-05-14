import { Controller, HttpCode, Get, Query, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExampleService } from '../services/example.service';
import { GamesService } from '../services/games.service';

@ApiTags('Games Controller')
@ApiBearerAuth('access-token')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('')
  @HttpCode(200)
  async getData(@Query('page') page: number, @Query('limit') limit: number) {
    if (!page) page = 1;
    if (!limit) limit = 10;
    return this.gamesService.getGames(page, limit);
  }

  @Get('search')
  @HttpCode(200)
  async getSearch(@Query('search') search: string) {
    return this.gamesService.getSearch(search);
  }

  @Get('detail/:id')
  @HttpCode(200)
  async getDetail(@Param('id') id: number) {
    return this.gamesService.getGameDetail(id);
  }
}
