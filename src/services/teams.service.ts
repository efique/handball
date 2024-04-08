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

  async createTeam(createTeamDto: CreateTeamDto) {
    return await this.teamRepository.save(createTeamDto);
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

  async updateTeam(id: number, updateTeamDto: UpdateTeamDto) {
    this.findOneTeam(id);

    return await this.teamRepository.update(id, updateTeamDto);
  }

  async removeTeam(id: number) {
    this.findOneTeam(id);

    return await this.teamRepository.delete(id);
  }
}
