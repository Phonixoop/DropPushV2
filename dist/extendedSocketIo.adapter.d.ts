/// <reference types="node" />
import * as io from 'socket.io';
import * as http from 'http';
import { IoAdapter } from '@nestjs/platform-socket.io';
export declare class ExtendedSocketIoAdapter extends IoAdapter {
    protected server: http.Server;
    protected ioServer: io.Server;
    constructor(server: http.Server);
    create(port: number): io.Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap>;
}
