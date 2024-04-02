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
    const match = this.teamRepository.find({
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

  async updateTeam(id: number, updateTeamDto: UpdateTeamDto) {
    return await this.teamRepository.update(id, updateTeamDto);
  }

  async removeTeam(id: number) {
    this.findOneTeam(id);

    return await this.teamRepository.delete(id);
  }
}
