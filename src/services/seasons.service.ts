import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { UpdateSeasonDto } from '../dto/update-season.dto';
import { Repository } from 'typeorm';
import { Season } from 'src/models/season.entity';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Season)
    private seasonRepository: Repository<Season>,
  ) {}

  async createSeason(createSeasonDto: CreateSeasonDto) {
    return await this.seasonRepository.save(createSeasonDto);
  }

  async findAllSeasons() {
    return await this.seasonRepository.find();
  }

  async findOneSeason(id: number) {
    const match = this.seasonRepository.find({
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

  async updateSeason(id: number, updateSeasonDto: UpdateSeasonDto) {
    return await this.seasonRepository.update(id, updateSeasonDto);
  }

  async removeSeason(id: number) {
    this.findOneSeason(id);

    return await this.seasonRepository.delete(id);
  }
}
