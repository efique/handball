import { Controller, Post, UseGuards, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/decorators/publicdecorator';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalAuthGuard)
  // @Public()
  // @Post('login')
  // signIn(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { access_token } = await this.authService.login(req.user);
    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send({ status: 'ok' });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
