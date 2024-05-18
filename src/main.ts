import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DEFAULT_PORT = 3003;
const DEFAULT_ENV = 'dev';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3003).then(() => {
    console.log(
      `Listening at port: ${process.env.PORT ?? DEFAULT_PORT} in ${
        process.env.STAGE ?? DEFAULT_ENV
      } env`,
    );
  });
}
bootstrap();
