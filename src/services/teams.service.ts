import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { Repository } from 'typeorm';
import { Team } from 'src/models/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async createTeam(data: CreateTeamDto) {
    return await this.teamRepository.save(data);
  }

  async findAllTeams() {
    return await this.teamRepository.find();
  }

  async findOneTeam(id: number) {
    const team = await this.teamRepository.findOneBy({ id });

    if (!team) {
      throw new NotFoundException('Team not found');
    } else {
      return await team;
    }
  }

  async updateTeam(id: number, data: UpdateTeamDto) {
    this.findOneTeam(id);

    return await this.teamRepository.update(id, data);
  }

  async removeTeam(id: number) {
    this.findOneTeam(id);

    return await this.teamRepository.delete(id);
  }
}
