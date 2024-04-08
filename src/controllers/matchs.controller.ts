import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MatchsService } from '../services/matchs.service';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { Match } from 'src/models/match.entity';

@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @Post()
  async createMatch(@Body() data: CreateMatchDto) {
    const match = new Match();
    Object.assign(match, data);
    await this.matchsService.createMatch(match, data.team_id);
    return { message: 'Match successfully created', id: match.id };
  }

  @Get()
  findAllMatchs() {
    return this.matchsService.findAllMatchs();
  }

  @Get(':id')
  findOneMatch(@Param('id') id: string) {
    return this.matchsService.findOneMatch(+id);
  }

  @Patch(':id')
  updateMatch(@Param('id') id: string, @Body() data: UpdateMatchDto) {
    return this.matchsService.updateMatch(+id, data);
  }

  @Delete(':id')
  removeMatch(@Param('id') id: string) {
    return this.matchsService.removeMatch(+id);
  }
}
