import { Module } from '@nestjs/common';
import { PlayersService } from '../services/players.service';
import { PlayersController } from '../controllers/players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/models/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
