import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SetCookie } from '~/session/session.decorator';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() body: SignInDto, @SetCookie() setCookie: SetCookie) {
    const token = await this.authService.signin(body);

    setCookie('__session', token, {
      httpOnly: true,
    });

    return {
      isSuccess: true,
    };
  }

  @Post('signup')
  async signup(@Body() body: SignUpDto, @SetCookie() setCookie: SetCookie) {
    const token = await this.authService.signup(body);

    setCookie('__session', token, {
      httpOnly: true,
    });

    return {
      isSuccess: true,
    };
  }

  @Get('logout')
  async logout(@SetCookie() setCookie: SetCookie) {
    setCookie('__session', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return {
      isSuccess: true,
    };
  }
}
