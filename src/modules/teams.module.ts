import { Module } from '@nestjs/common';
import { TeamsService } from '../services/teams.service';
import { TeamsController } from '../controllers/teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/models/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
