import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatsService } from '../services/stats.service';
import { CreateStatDto } from '../dto/create-stat.dto';
import { UpdateStatDto } from '../dto/update-stat.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post()
  createStat(@Body() data: CreateStatDto) {
    return this.statsService.createStat(data);
  }

  @Get()
  findAllStats() {
    return this.statsService.findAllStats();
  }

  @Get(':id')
  findOneStat(@Param('id') id: string) {
    return this.statsService.findOneStat(+id);
  }

  @Patch(':id')
  updateStat(@Param('id') id: string, @Body() data: UpdateStatDto) {
    return this.statsService.updateStat(+id, data);
  }

  @Delete(':id')
  removeStat(@Param('id') id: string) {
    return this.statsService.removeStat(+id);
  }
}
