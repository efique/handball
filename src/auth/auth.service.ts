import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneUserByUsername(username);

    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(user): Promise<{ access_token: string }> {
    const payload = { username: user.username, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: User): Promise<{ access_token: string }> {
    const existingUser = this.usersService.findOneUserByUsername(user.username);
    if (existingUser) {
      throw new BadRequestException('username already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: User = { ...user, password: hashedPassword };
    await this.usersService.createUser(newUser);
    return this.login(newUser);
  }
}
