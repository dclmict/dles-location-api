/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import { LocationService } from './location/location.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const locationService = app.get(LocationService);

  const jsonPath = path.join(__dirname, '../data/languages.json');
  const dataArray = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as Array<{
    languageId: string;
    languageName: string;
  }>;

  for (const data of dataArray) {
    await locationService.createLanguage({
      // id: data?.languageId,
      name: data?.languageName,
    });
  }

  await app.close();
}

bootstrap();
