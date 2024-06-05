import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
