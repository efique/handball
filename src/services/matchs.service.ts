import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/models/match.entity';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  async createMatch(createMatchDto: CreateMatchDto) {
    return await this.matchRepository.save(createMatchDto);
  }

  async findAllMatchs() {
    return await this.matchRepository.find();
  }

  async findOneMatch(id: number) {
    const match = this.matchRepository.find({
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

  async updateMatch(id: number, updateMatchDto: UpdateMatchDto) {
    return await this.matchRepository.update(id, updateMatchDto);
  }

  async removeMatch(id: number) {
    this.findOneMatch(id);

    return await this.matchRepository.delete(id);
  }
}
