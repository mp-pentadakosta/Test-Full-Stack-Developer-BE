import { Controller, HttpCode, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CountryService } from '../services/country.service';

@ApiTags('Country Controller')
@ApiBearerAuth('access-token')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('')
  @HttpCode(200)
  async getData() {
    return this.countryService.getAllCountry();
  }
}
