import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
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
    console.log('ID:', id);
    return this.animeService.update(id, anime);
  }
}
