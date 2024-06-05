import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { Anime } from './anime.entity';

@Controller('animes')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get()
  findAll(): Promise<Anime[]> {
    return this.animeService.findAll();
  }

  @Post()
  create(@Body() anime: Anime): Promise<Anime> {
    return this.animeService.create(anime);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() anime: Anime): Promise<Anime> {
    return this.animeService.update(id, anime);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.animeService.remove(id);
  }
}
