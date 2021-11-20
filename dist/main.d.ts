import { ServerOptions } from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';
export declare class SocketAdapter extends IoAdapter {
    createIOServer(port: number, options?: ServerOptions & {
        namespace?: string;
        server?: any;
    }): any;
}
export default SocketAdapter;
