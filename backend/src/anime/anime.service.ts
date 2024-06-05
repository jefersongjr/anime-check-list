import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Anime } from './anime.entity';

const DATA_PATH = path.join(process.cwd(), 'animes.json');

@Injectable()
export class AnimeService {
  private async readFile(): Promise<Anime[]> {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data) as Anime[];
  }

  private async writeFile(animes: Anime[]): Promise<void> {
    try {
      await fs.writeFile(DATA_PATH, JSON.stringify(animes, null, 2), 'utf8');
    } catch (err) {
      console.error(`Error writing file to path: ${DATA_PATH}`, err);
      throw new Error('Error writing data');
    }
  }

  async findAll(): Promise<Anime[]> {
    return this.readFile();
  }

  async create(anime: Anime): Promise<Anime> {
    const animes = await this.readFile();
    anime.id = animes.length ? animes[animes.length - 1].id + 1 : 1;
    animes.push(anime);
    await this.writeFile(animes);
    return anime;
  }

  async update(id: number, updatedAnime: Anime): Promise<Anime> {
    const animes = await this.readFile();
    const animeIndex = animes.findIndex((anime) => anime.id == id);
    console.log(animeIndex);
    if (animeIndex === -1) {
      throw new Error('Anime not found');
    }
    animes[animeIndex] = { ...animes[animeIndex], ...updatedAnime };
    await this.writeFile(animes);
    return animes[animeIndex];
  }
}
