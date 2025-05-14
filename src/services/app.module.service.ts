import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ExampleService } from './example.service';
import { GamesService } from './games.service';
import { CountryService } from './country.service';
import { PrefixService } from './prefix.service';
import { OrderService } from './order.service';

export const appModuleService: any[] = [
  AuthService,
  UserService,
  ExampleService,
  GamesService,
  CountryService,
  PrefixService,
  OrderService,
];
