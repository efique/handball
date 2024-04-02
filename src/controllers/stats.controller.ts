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
  create(@Body() createStatDto: CreateStatDto) {
    return this.statsService.createStat(createStatDto);
  }

  @Get()
  findAll() {
    return this.statsService.findAllStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statsService.findOneStat(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatDto: UpdateStatDto) {
    return this.statsService.updateStat(+id, updateStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statsService.removeStat(+id);
  }
}
