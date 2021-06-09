"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors = require('cors');
const common_1 = require("@nestjs/common");
require('dotenv').config();
const cookieParser = require('cookie-parser');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Expose-Headers', 'x-access-token');
        next();
    });
    let allowList = ['http://localhost:4200', '/api/v1/push'];
    app.enableCors(function (req, callback) {
        let corsOptions;
        if (allowList.indexOf(req.header('Origin')) !== -1 ||
            allowList.indexOf(req.path) !== -1) {
            corsOptions = { origin: true };
        }
        else {
            corsOptions = { origin: false };
        }
        callback(null, corsOptions);
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map