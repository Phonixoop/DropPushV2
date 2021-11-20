"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketAdapter = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const cors = require('cors');
class SocketAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
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
exports.SocketAdapter = SocketAdapter;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const whiteList = [
        'https://admin.socket.io',
        'http://localhost:4200',
        '/api/v1/push',
    ];
    app.enableCors(function (req, callback) {
        let corsOptions;
        if (whiteList.indexOf(req.header('Origin')) !== -1 ||
            whiteList.indexOf(req.path) !== -1) {
            corsOptions = {
                origin: true,
                credentials: true,
                methods: 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE',
                allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
                exposedHeaders: 'x-access-token',
            };
        }
        else {
            corsOptions = { origin: false };
        }
        callback(null, corsOptions);
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useWebSocketAdapter(new SocketAdapter(app));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
exports.default = SocketAdapter;
//# sourceMappingURL=main.js.map