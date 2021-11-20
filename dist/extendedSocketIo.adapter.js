"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedSocketIoAdapter = void 0;
const io = require("socket.io");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class ExtendedSocketIoAdapter extends platform_socket_io_1.IoAdapter {
    server;
    ioServer;
    constructor(server) {
        super();
        this.server = server;
        this.ioServer = io(server);
    }
    create(port) {
        console.log('websocket gateway port argument is ignored by ExtendedSocketIoAdapter, use the same port of http instead');
        return this.ioServer;
    }
}
exports.ExtendedSocketIoAdapter = ExtendedSocketIoAdapter;
//# sourceMappingURL=extendedSocketIo.adapter.js.map