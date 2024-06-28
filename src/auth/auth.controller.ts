import { Controller, Post, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/decorators/publicdecorator';
import { LocalAuthGuard } from './guards/local.guard';
import { Request, Response, NextFunction } from 'express';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ short: { limit: 2, ttl: 1000 }, long: { limit: 5, ttl: 60000 } })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    try {
      const token = await this.authService.login(req.user);
      res
        .cookie('access_token', token.access_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        })
        .send({
          status: 'Logged in successfully',
          user: {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role,
          },
        });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  logout(@Res() res: Response) {
    try {
      res
        .clearCookie('access_token')
        .send({ status: 'Logged out successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  // @UseGuards(AuthGuard)
  // @Get('isauthenticated')
  // isAuthenticated(@Req() req: Request, @Res() res: Response) {
  //   return res.send({ status: 'Is Authenticated' });
  // }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
