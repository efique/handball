import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeasonsService } from '../services/seasons.service';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { UpdateSeasonDto } from '../dto/update-season.dto';

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Post()
  create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonsService.createSeason(createSeasonDto);
  }

  @Get()
  findAll() {
    return this.seasonsService.findAllSeasons();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seasonsService.findOneSeason(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeasonDto: UpdateSeasonDto) {
    return this.seasonsService.updateSeason(+id, updateSeasonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seasonsService.removeSeason(+id);
  }
}
