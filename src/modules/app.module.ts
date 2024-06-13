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
import { IsUniqueConstraint } from 'src/validations/isUniqueValidator';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlayersModule,
    UsersModule,
    SeasonsModule,
    StatsModule,
    TeamsModule,
    MatchsModule,
    PlayersToTeamsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [Player, User, Season, Stat, Team, Match, PlayerToTeam],
      // autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    IsUniqueConstraint,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
