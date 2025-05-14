import { Injectable } from '@nestjs/common';
import { CountryRepository } from '../repository/country.repository';
import { ResponseSuccess } from '../core/dto/response';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async getAllCountry() {
    const resp = await this.countryRepository.findAllCountry();

    return ResponseSuccess.success({
      listData: resp,
    });
  }
}
