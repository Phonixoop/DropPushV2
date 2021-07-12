import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
const cors = require('cors');
import path, { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
require('dotenv').config();
const cookieParser = require('cookie-parser');
const fs = require('fs');

// process.on('uncaughtException', (err) => {
//   try {
//     console.log('whoops! there was an error' + err);
//     fs.writeFileSync(`${__dirname}\DropLog.txt`, err);
//   } catch {}
// });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE',
    );

    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
    );

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'x-access-token');

    next();
  });

  let allowList = ['http://localhost:4200', '/api/v1/push'];
  app.enableCors(function (req: Request, callback) {
    let corsOptions;
    if (
      allowList.indexOf(req.header('Origin')) !== -1 ||
      allowList.indexOf(req.path) !== -1
    ) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }

    callback(null, corsOptions); // callback expects two pa
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  //app.setGlobalPrefix('/api/v1');

  // setInterval((x) => {
  //   const used = process.memoryUsage().heapUsed / 1024 / 1024;
  //   console.log(
  //     `The script uses approximately ${Math.round(used * 100) / 100} MB`,
  //   );
  // }, 1000);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
