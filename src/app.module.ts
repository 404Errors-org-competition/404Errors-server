import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from "@nestjs/config";
import { InfrastructureObjectModule } from './infrastructure-object/infrastructure-object.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        InfrastructureObjectModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
