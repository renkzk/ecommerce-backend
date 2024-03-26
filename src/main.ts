import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ValidationPipe ensures that all endpoints are protected from receiving incorrect data
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
