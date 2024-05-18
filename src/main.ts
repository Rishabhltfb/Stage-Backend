import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RequestLoggingInterceptor } from './util/interceptors/request-logging.interceptor';

const DEFAULT_PORT = 3003;
const DEFAULT_ENV = 'dev';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new RequestLoggingInterceptor());

  await app.listen(3003).then(() => {
    console.log(
      `Listening at port: ${process.env.PORT ?? DEFAULT_PORT} in ${
        process.env.STAGE ?? DEFAULT_ENV
      } env`,
    );
  });
}
bootstrap();
