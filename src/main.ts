import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Server, ServerOptions, Socket } from 'socket.io';
import * as cookieParser from 'cookie-parser';
import { instrument } from '@socket.io/admin-ui';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
const cors = require('cors');
export class SocketAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    },
  ) {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        transports: ['websocket', 'polling'],
        credentials: true,
      },
      allowEIO3: true,
    });
    return server;
  }
}

// process.on('uncaughtException', (err) => {
//   try {
//     console.log('whoops! there was an error' + err);
//     fs.writeFileSync(`${__dirname}\DropLog.txt`, err);
//   } catch {}
// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useWebSocketAdapter(
  //   new MyIoAdapter(
  //     // Cast to any to get around httpServer being private
  //     (<any>app).httpServer,
  //   ),
  // );

  // app.use(function (req, res: Response, next: NextFunction) {
  //   res.header(
  //     'Access-Control-Allow-Methods',
  //     'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE',
  //   );

  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
  //   );
  //   //res.header('Access-Control-Allow-Origin', 'http://localhost:4200/');
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   res.header('Access-Control-Expose-Headers', 'x-access-token');

  //   next();
  // });
  // app.use(helmet());
  // app.use(csurf());

  const whiteList = [
    'https://admin.socket.io',
    'http://localhost:4200',
    '/api/v1/push',
  ];

  app.enableCors(function (req: Request, callback) {
    let corsOptions;
    if (
      whiteList.indexOf(req.header('Origin')) !== -1 ||
      whiteList.indexOf(req.path) !== -1
    ) {
      corsOptions = {
        origin: true,
        credentials: true,
        methods: 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE',
        allowedHeaders:
          'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
        exposedHeaders: 'x-access-token',
      }; // reflect (enable) the requested origin in the CORS response
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

  app.useWebSocketAdapter(new SocketAdapter(app));

  await app.listen(process.env.PORT || 3000);
}

bootstrap();

export default SocketAdapter;
