import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SetCookie } from '~/session/session.decorator';
import { SignUpDto } from './dto/signup.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign in to the application',
    description: 'Authenticate user and set session cookie',
  })
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

  @ApiOperation({
    summary: 'Sign up for a new account',
    description: 'Create a new user account and set session cookie',
  })
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

  @ApiOperation({
    summary: 'Log out of the application',
    description: 'Clear session cookie to log out user',
  })
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
