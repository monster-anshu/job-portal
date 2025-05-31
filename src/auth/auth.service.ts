import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserModelProvider } from '~/mongo/user.schema';
import { SignUpDto } from './dto/signup.dto';
import bcrypt from 'bcryptjs';
import { signJwt } from '~/lib/jwt';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserModelProvider.provide)
    private readonly userModel: typeof UserModelProvider.useValue,
  ) {}

  async signup({ email, password, name, type }: SignUpDto) {
    const existing = await this.userModel.findOne({ email: email }).lean();
    if (existing) {
      throw new ConflictException('Duplicate email');
    }
    const hash = await bcrypt.hash(password, 10);
    const userDoc = await this.userModel.create({
      name: name,
      email: email,
      password: hash,
      access: [type],
    });

    const token = signJwt({
      access: userDoc.access,
      userId: userDoc._id.toString(),
    });

    return token;
  }

  async signin({ email, password }: SignInDto) {
    const user = await this.userModel.findOne({ email: email }).lean();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Wrong password');
    }

    const token = signJwt({
      access: user.access,
      userId: user._id.toString(),
    });

    return token;
  }
}
