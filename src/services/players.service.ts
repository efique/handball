import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/models/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto) {
    return await this.playerRepository.save(createPlayerDto);
  }

  async findAllPlayers() {
    return await this.playerRepository.find();
  }

  async findOnePlayer(id: number) {
    const player = await this.playerRepository.findOneBy({ id });

    if (!player) {
      throw new NotFoundException('Player not found');
    } else {
      return await player;
    }
  }

  async updatePlayer(id: number, updatePlayerDto: UpdatePlayerDto) {
    this.findOnePlayer(id);

    return await this.playerRepository.update(id, updatePlayerDto);
  }

  async removePlayer(id: number) {
    this.findOnePlayer(id);

    return await this.playerRepository.delete(id);
  }
}
