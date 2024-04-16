import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { PlayersModule } from './players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Player } from 'src/models/player.entity';
import { UsersModule } from './users.module';
import { SeasonsModule } from './seasons.module';
import { StatsModule } from './stats.module';
import { TeamsModule } from './teams.module';
import { User } from 'src/models/user.entity';
import { Season } from 'src/models/season.entity';
import { Stat } from 'src/models/stat.entity';
import { Team } from 'src/models/team.entity';
import { Match } from 'src/models/match.entity';
import { MatchsModule } from './matchs.module';
import { PlayerToTeam } from 'src/models/playertoteam.entity';
import { PlayersToTeamsModule } from './playerstoteams.module';

@Module({
  imports: [
    PlayersModule,
    UsersModule,
    SeasonsModule,
    StatsModule,
    TeamsModule,
    MatchsModule,
    PlayersToTeamsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'handball',
      entities: [Player, User, Season, Stat, Team, Match, PlayerToTeam],
      // autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
