import { Module } from '@nestjs/common';
import { MatchsService } from '../services/matchs.service';
import { MatchsController } from '../controllers/matchs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/models/match.entity';
import { TeamsModule } from './teams.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match]), TeamsModule],
  controllers: [MatchsController],
  providers: [MatchsService],
  exports: [MatchsService],
})
export class MatchsModule {}
