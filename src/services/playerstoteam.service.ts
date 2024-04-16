import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerToTeam } from 'src/models/playertoteam.entity';
import { Repository } from 'typeorm';
import { PlayersService } from './players.service';
import { TeamsService } from './teams.service';
import { SeasonsService } from './seasons.service';

@Injectable()
export class PlayersToTeamsService {
  constructor(
    @InjectRepository(PlayerToTeam)
    private playerToTeamRepository: Repository<PlayerToTeam>,
    private readonly playersService: PlayersService,
    private readonly teamsService: TeamsService,
    private readonly seasonsService: SeasonsService,
  ) {}

  async createPlayerToTeam(playerToTeam: PlayerToTeam, data) {
    const player = await this.playersService.findOnePlayer(data.player_id);
    const team = await this.teamsService.findOneTeam(data.team_id);
    const season = await this.seasonsService.findOneSeason(data.season_id);

    const playerFromTeam = await this.playersService.findOnePlayerByTeam({
      id: data.player_id,
      team_id: data.team_id,
    });

    if (!player || !team || !season) {
      throw new NotFoundException();
    } else if (playerFromTeam.length > 0) {
      throw new ConflictException('Player already linked with this team');
    } else {
      playerToTeam.player = player;
      playerToTeam.team = team;
      playerToTeam.season = season;
      await this.playerToTeamRepository.save(playerToTeam);
    }
  }

  async findAllPlayersToTeams() {
    return await this.playerToTeamRepository.find({
      relations: ['team', 'player', 'season'],
    });
  }

  async findOnePlayerToTeam(id: number) {
    const playerToTeam = await this.playerToTeamRepository.findOne({
      where: { id: id },
      relations: ['team', 'player', 'season'],
    });

    if (!playerToTeam) {
      throw new NotFoundException('Player linked to this team not found');
    } else {
      return await playerToTeam;
    }
  }

  async removePlayerToTeam(id: number) {
    this.findOnePlayerToTeam(id);

    return await this.playerToTeamRepository.delete(id);
  }
}
