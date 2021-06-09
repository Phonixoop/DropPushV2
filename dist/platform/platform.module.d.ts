import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
export declare class PlatformModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
