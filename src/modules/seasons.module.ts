import { Module } from '@nestjs/common';
import { SeasonsService } from '../services/seasons.service';
import { SeasonsController } from '../controllers/seasons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from 'src/models/season.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Season])],
  controllers: [SeasonsController],
  providers: [SeasonsService],
})
export class SeasonsModule {}
