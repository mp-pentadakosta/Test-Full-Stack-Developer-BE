import { AuthController } from './auth.controller';
import { ProfileController } from './profile.controller';
import { ExampleController } from './example.controller';
import { GamesController } from './games.controller';
import { CountryController } from './country.controller';
import { PrefixController } from './prefix.controller';
import { OrderController } from './order.controller';

export const appModuleController: any[] = [
  AuthController,
  ProfileController,
  ExampleController,
  GamesController,
  CountryController,
  PrefixController,
  OrderController,
];
