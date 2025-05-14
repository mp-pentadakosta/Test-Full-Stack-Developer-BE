import { UserRepository } from './user.repository';
import { GamesRepository } from './games.repository';
import { CountryRepository } from './country.repository';
import { PrefixRepository } from './prefix.repository';
import { OrderRepository } from './order.repository';

export const appModuleRepository: any[] = [
  UserRepository,
  GamesRepository,
  CountryRepository,
  PrefixRepository,
  OrderRepository,
];
