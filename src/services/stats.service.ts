import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStatDto } from '../dto/create-stat.dto';
import { UpdateStatDto } from '../dto/update-stat.dto';
import { Repository } from 'typeorm';
import { Stat } from 'src/models/stat.entity';
import { PlayersService } from './players.service';
import { MatchsService } from './matchs.service';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stat)
    private statRepository: Repository<Stat>,
    private readonly playersService: PlayersService,
    private readonly matchsService: MatchsService,
  ) {}

  async createStat(createStatDto: CreateStatDto) {
    const player = await this.playersService.findOnePlayer(
      createStatDto.player_id,
    );
    const match = await this.matchsService.findOneMatch(createStatDto.match_id);

    if (!player || !match) {
      throw new NotFoundException();
    } else {
      return await this.statRepository.save(createStatDto);
    }
  }

  async findAllStats() {
    return await this.statRepository.find();
  }

  async findOneStat(id: number) {
    const stat = await this.statRepository.findOneBy({ id });

    if (!stat) {
      throw new NotFoundException('Stats not found');
    } else {
      return await stat;
    }
  }

  async updateStat(id: number, updateStatDto: UpdateStatDto) {
    this.findOneStat(id);

    return await this.statRepository.update(id, updateStatDto);
  }

  async removeStat(id: number) {
    this.findOneStat(id);

    return await this.statRepository.delete(id);
  }
}
