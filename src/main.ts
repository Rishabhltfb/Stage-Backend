import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RequestLoggingInterceptor } from './util/interceptors/request-logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new RequestLoggingInterceptor());

  const PORT = process.env.PORT ?? 3003;
  const ENV = process.env.STAGE ?? 'dev';

  await app.listen(PORT).then(() => {
    console.log(`Listening at port: ${PORT} in ${ENV} env`);
  });
}
bootstrap();
