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

  async createPlayer(data: CreatePlayerDto) {
    return await this.playerRepository.save(data);
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

  async findOnePlayerByTeam(data) {
    const player = await this.playerRepository.find({
      where: {
        id: data.id,
        playerToTeams: {
          id: data.team_id,
        },
      },
    });

    if (!player || !player.length) {
      throw new NotFoundException('Player not found');
    } else {
      return await player;
    }
  }

  async updatePlayer(id: number, data: UpdatePlayerDto) {
    this.findOnePlayer(id);

    return await this.playerRepository.update(id, data);
  }

  async removePlayer(id: number) {
    this.findOnePlayer(id);

    return await this.playerRepository.delete(id);
  }
}
