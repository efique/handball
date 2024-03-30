import { Module } from '@nestjs/common';
import { MatchsService } from '../services/matchs.service';
import { MatchsController } from '../controllers/matchs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/models/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [MatchsController],
  providers: [MatchsService],
})
export class MatchsModule {}
