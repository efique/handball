import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { PlayersService } from '../services/players.service';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  createPlayer(@Body() data: CreatePlayerDto) {
    return this.playersService.createPlayer(data);
  }

  @Get()
  findAllPlayers() {
    return this.playersService.findAllPlayers();
  }

  @Get(':id')
  findOnePlayer(@Param('id') id: string) {
    return this.playersService.findOnePlayer(+id);
  }

  @Patch(':id')
  updatePlayer(@Param('id') id: string, @Body() data: UpdatePlayerDto) {
    return this.playersService.updatePlayer(+id, data);
  }

  @Delete(':id')
  removePlayer(@Param('id') id: string) {
    return this.playersService.removePlayer(+id);
  }
}
