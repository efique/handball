import { Module } from '@nestjs/common';
import { StatsService } from '../services/stats.service';
import { StatsController } from '../controllers/stats.controller';
import { Stat } from 'src/models/stat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Stat])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
