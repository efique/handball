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
  createSeason(@Body() data: CreateSeasonDto) {
    return this.seasonsService.createSeason(data);
  }

  @Get()
  findAllSeasons() {
    return this.seasonsService.findAllSeasons();
  }

  @Get(':id')
  findOneSeason(@Param('id') id: string) {
    return this.seasonsService.findOneSeason(+id);
  }

  @Patch(':id')
  updateSeason(@Param('id') id: string, @Body() data: UpdateSeasonDto) {
    return this.seasonsService.updateSeason(+id, data);
  }

  @Delete(':id')
  removeSeason(@Param('id') id: string) {
    return this.seasonsService.removeSeason(+id);
  }
}
