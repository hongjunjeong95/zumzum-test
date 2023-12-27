import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  const options = new DocumentBuilder().setTitle('backend-test').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());

  await app.listen(PORT || 3000, () => {
    if (process.send) {
      process.send('ready');
    }
    logger.log(`✅ API Server is listening on ${PORT}`);
  });
}
bootstrap();
