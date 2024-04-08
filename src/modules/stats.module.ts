import { Module } from '@nestjs/common';
import { StatsService } from '../services/stats.service';
import { StatsController } from '../controllers/stats.controller';
import { Stat } from 'src/models/stat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from './players.module';
import { MatchsModule } from './matchs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stat]), PlayersModule, MatchsModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
