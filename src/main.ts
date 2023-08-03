import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { mkdirSync } from 'fs';

async function bootstrap() {
  mkdirSync(resolve(__dirname, 'out'), { recursive: true })

  const app = await NestFactory.create(AppModule);
  await app.listen(3010);
}
bootstrap();
