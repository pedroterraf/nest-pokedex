import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/V2');

  app.useGlobalPipes(
    new ValidationPipe({
      // Validacion general a todos los endpoints
      whitelist: true, // Validacion para las props que se le pasan al endpoint
      forbidNonWhitelisted: true, // BadRequest para cuando envian una prop que no necesita el endpoint
      transform: true, // Habilito que transforme la informacion que fluye por dtos
      transformOptions: {
        enableImplicitConversion: true, // Habilito que transforme la informacion que fluye por dtos
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
