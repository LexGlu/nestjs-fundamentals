import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from "./common/filters/http-exception/http-exception.filter";
import { WrapResponseInterceptor } from "./common/interceptors/wrap-response/wrap-response.interceptor";
import { TimeoutInterceptor } from "./common/interceptors/timeout/timeout.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // this will remove any properties that are not in the DTO
    transform: true, // this will transform the incoming data to the DTO type
    forbidNonWhitelisted: true, // this will throw an error if there are properties that are not in the DTO
    transformOptions: {
      enableImplicitConversion: true, // this will convert the incoming data to the DTO type
    },
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor());
  await app.listen(3000);
}
bootstrap();
