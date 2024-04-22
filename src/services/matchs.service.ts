import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/models/match.entity';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { Repository } from 'typeorm';
import { TeamsService } from './teams.service';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private readonly teamsService: TeamsService,
  ) {}

  async createMatch(data: Match, team_id) {
    const team = await this.teamsService.findOneTeam(team_id);

    if (!team) {
      throw new NotFoundException();
    } else {
      data.team = team;
      await this.matchRepository.save(data);
    }
  }

  async findAllMatchs() {
    return await this.matchRepository.find({ relations: ['team'] });
  }

  async findOneMatch(id: number) {
    const match = await this.matchRepository.findOne({
      where: { id: id },
      relations: ['team'],
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    } else {
      return await match;
    }
  }

  async updateMatch(id: number, data: UpdateMatchDto) {
    this.findOneMatch(id);

    return await this.matchRepository.update(id, data);
  }

  async removeMatch(id: number) {
    this.findOneMatch(id);

    return await this.matchRepository.delete(id);
  }
}
