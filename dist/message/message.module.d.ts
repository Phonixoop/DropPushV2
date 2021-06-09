import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
export declare class MessageModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
