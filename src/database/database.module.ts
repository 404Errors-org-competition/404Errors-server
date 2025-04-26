import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Global()
@Module({
    providers: [DatabaseService],
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return { uri: configService.get<string>('MONGODB_URI') }
            }
        }),
    ]
})
export class DatabaseModule {}
