import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin:'http://localhost:4000',
    credentials:true
  })

  app.use(cookieParser(),
    session({
      secret: 'Hello-World',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set `true` in production with HTTPS
    }),
  );
  await app.listen(3000);
}
bootstrap();
// SELECT * FROM slots;
