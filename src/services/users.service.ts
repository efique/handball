import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    const saltOrRounds = 10;
    const password = data.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    data.password = hash;

    return await this.userRepository.save(data);
  }

  async findAllUsers() {
    return await this.userRepository.find();
  }

  async findOneUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return await user;
    }
  }

  async findOneUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return await user;
    }
  }

  async updateUser(id: number, data: UpdateUserDto) {
    this.findOneUser(id);
    //Problème lors de l'update si je modifie le username avec le même username (validator)
    if (data.password) {
      const saltOrRounds = 10;
      const password = data.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      data.password = hash;
    }

    return await this.userRepository.update(id, data);
  }

  async removeUser(id: number) {
    this.findOneUser(id);

    return await this.userRepository.delete(id);
  }
}
