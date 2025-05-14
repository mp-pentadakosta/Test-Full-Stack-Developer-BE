import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { ResponseSuccess } from '../core/dto/response';
import { errors } from '../error/error';
import { CustomHttpException } from '../core/custom.http.exception';

@Injectable()
export class ExampleService {
  constructor(private readonly userRepository: UserRepository) {}

  async getExample(page: number, limit: number): Promise<any> {
    const resp = await this.userRepository.getAllUser(page, limit);

    return ResponseSuccess.success({
      listData: resp.map((item) => {
        return {
          ...item,
        };
      }),
    });
  }

  async getDetail(id: number): Promise<any> {
    const resp = await this.userRepository.findByUserTokenId(id);

    if (!resp) {
      throw new CustomHttpException(errors.FAILED_GET_DATA);
    }

    return ResponseSuccess.success({
      data: {
        ...resp,
      },
    });
  }

  async getSearch(search: string): Promise<any> {
    const resp = await this.userRepository.getSearch(search);

    return ResponseSuccess.success({
      listData: resp.map((item) => {
        return {
          ...item,
        };
      }),
    });
  }
}
