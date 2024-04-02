import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStatDto } from '../dto/create-stat.dto';
import { UpdateStatDto } from '../dto/update-stat.dto';
import { Repository } from 'typeorm';
import { Stat } from 'src/models/stat.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stat)
    private statRepository: Repository<Stat>,
  ) {}

  async createStat(createStatDto: CreateStatDto) {
    return await this.statRepository.save(createStatDto);
  }

  async findAllStats() {
    return await this.statRepository.find();
  }

  async findOneStat(id: number) {
    const match = this.statRepository.find({
      where: {
          id: id,
      },
    });

    if(!(await match).length) {
      throw new NotFoundException();
    } else {
      return await match;
    }
  }

  async updateStat(id: number, updateStatDto: UpdateStatDto) {
    return await this.statRepository.update(id, updateStatDto);
  }

  async removeStat(id: number) {
    this.findOneStat(id);

    return await this.statRepository.delete(id);
  }
}
