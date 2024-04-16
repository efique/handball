import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerToTeam } from 'src/models/playertoteam.entity';
import { PlayersToTeamsController } from 'src/controllers/playerstoteams.controller';
import { PlayersToTeamsService } from 'src/services/playerstoteam.service';
import { PlayersModule } from './players.module';
import { TeamsModule } from './teams.module';
import { SeasonsModule } from './seasons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerToTeam]),
    PlayersModule,
    TeamsModule,
    SeasonsModule,
  ],
  controllers: [PlayersToTeamsController],
  providers: [PlayersToTeamsService],
  exports: [PlayersToTeamsService],
})
export class PlayersToTeamsModule {}
