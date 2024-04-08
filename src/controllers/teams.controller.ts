import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamsService } from '../services/teams.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  createTeam(@Body() data: CreateTeamDto) {
    return this.teamsService.createTeam(data);
  }

  @Get()
  findAllTeams() {
    return this.teamsService.findAllTeams();
  }

  @Get(':id')
  findOneTeam(@Param('id') id: string) {
    return this.teamsService.findOneTeam(+id);
  }

  @Patch(':id')
  updateTeam(@Param('id') id: string, @Body() data: UpdateTeamDto) {
    return this.teamsService.updateTeam(+id, data);
  }

  @Delete(':id')
  removeTeam(@Param('id') id: string) {
    return this.teamsService.removeTeam(+id);
  }
}
