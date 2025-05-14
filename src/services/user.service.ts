import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CustomHttpException } from '../core/custom.http.exception';
import { ResponseSuccess } from '../core/dto/response';
import { errors } from '../error/error';
import { DateTimeUtils } from '../utils/date.time.utils';
import { ProfileReqDto } from '../dto/profile.dto';
import { UpdatePasswordReqDto } from '../dto/auth.dto';
import { comparePassword, hashPassword } from '../utils/hash.utils';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dateTimeUtils: DateTimeUtils,
  ) {}

  async getUser(id: number) {
    const user = await this.userRepository.findByUserTokenId(id);
    if (!user) {
      throw new CustomHttpException(errors.USER_NOT_FOUND);
    }

    return ResponseSuccess.success({
      user: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  }

  async editUserProfile(id: number, data: ProfileReqDto) {
    const user = await this.userRepository.findByUserTokenId(id);
    if (!user) {
      throw new CustomHttpException(errors.USER_NOT_FOUND);
    }

    const updatedUser = await this.userRepository.updateUser(id, {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dob: data.dob ? this.dateTimeUtils.stringToDate(data.dob) : null,
      avatar: data.avatar,
      address: data.address,
    });
    if (!updatedUser) {
      throw new CustomHttpException(errors.FAILED_UPDATE_DATA);
    }

    return ResponseSuccess.success({
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
      },
    });
  }

  async updatePassword(id: number, data: UpdatePasswordReqDto) {
    const user = await this.userRepository.findByUserTokenId(id);

    if (!user) {
      throw new CustomHttpException(errors.USER_NOT_FOUND);
    }

    const isPasswordMatch = await comparePassword(
      data.oldPassword,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new CustomHttpException(errors.INVALID_CREDENTIAL);
    }

    const password = await hashPassword(data.newPassword);

    const updatedUser = await this.userRepository.updatePassword(id, password);

    if (!updatedUser) {
      throw new CustomHttpException(errors.FAILED_UPDATE_DATA);
    }

    return ResponseSuccess.success(null, 'Success update password');
  }
}
