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

  async findAll(): Promise<Anime[]> {
    return this.readFile();
  }
}
