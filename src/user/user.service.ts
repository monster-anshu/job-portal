import { Inject, Injectable } from '@nestjs/common';
import { UserModelProvider } from '~/mongo/user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserModelProvider.provide)
    private readonly userModel: typeof UserModelProvider.useValue,
  ) {}

  async getById(id: string) {
    const user = await this.userModel
      .findOne({ _id: id })
      .lean()
      .select('-password');

    return user;
  }
}
