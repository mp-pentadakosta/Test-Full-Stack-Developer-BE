import { Controller, HttpCode, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrefixService } from '../services/prefix.service';

@ApiTags('Prefix Controller')
@ApiBearerAuth('access-token')
@Controller('prefix')
export class PrefixController {
  constructor(private readonly prefixService: PrefixService) {}

  @Get(':idGame')
  @HttpCode(200)
  async getDetail(@Param('idGame') idGame: number) {
    return this.prefixService.getAllPrefixByIdGame(idGame);
  }
}
