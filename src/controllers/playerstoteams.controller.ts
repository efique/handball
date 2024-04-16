import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreatePlayerToTeamDto } from 'src/dto/create-playertoteam.dto';
import { PlayerToTeam } from 'src/models/playertoteam.entity';
import { PlayersToTeamsService } from 'src/services/playerstoteam.service';

@Controller('playerstoteams')
export class PlayersToTeamsController {
  constructor(private readonly playersToTeamsService: PlayersToTeamsService) {}

  @Post()
  async createPlayerToTeam(@Body() data: CreatePlayerToTeamDto) {
    const playerToTeam = new PlayerToTeam();
    Object.assign(playerToTeam, data);
    await this.playersToTeamsService.createPlayerToTeam(playerToTeam, data);
    return {
      message: 'Player and team successfully linked',
      id: playerToTeam.id,
    };
  }

  @Get()
  findAllPlayersToTeams() {
    return this.playersToTeamsService.findAllPlayersToTeams();
  }

  @Get(':id')
  findOnePlayerToTeam(@Param('id') id: string) {
    return this.playersToTeamsService.findOnePlayerToTeam(+id);
  }

  @Delete(':id')
  removePlayerToTeam(@Param('id') id: string) {
    return this.playersToTeamsService.removePlayerToTeam(+id);
  }
}
