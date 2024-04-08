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
    const season = await this.seasonRepository.findOneBy({ id });

    if (!season) {
      throw new NotFoundException('Season not found');
    } else {
      return await season;
    }
  }

  async updateSeason(id: number, updateSeasonDto: UpdateSeasonDto) {
    this.findOneSeason(id);

    return await this.seasonRepository.update(id, updateSeasonDto);
  }

  async removeSeason(id: number) {
    this.findOneSeason(id);

    return await this.seasonRepository.delete(id);
  }
}
