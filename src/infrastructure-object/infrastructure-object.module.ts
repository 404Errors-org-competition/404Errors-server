import { Module } from '@nestjs/common';
import { InfrastructureObjectService } from './infrastructure-object.service';
import { InfrastructureObjectController } from './infrastructure-object.controller';
import { MongooseModule } from "@nestjs/mongoose";
import {
    InfrastructureObject,
    InfrastructureObjectSchema
} from "src/infrastructure-object/infrastructure-object.schema";

@Module({
    providers: [InfrastructureObjectService],
    controllers: [InfrastructureObjectController],
    imports: [
        MongooseModule.forFeature([
            { schema: InfrastructureObjectSchema, name: InfrastructureObject.name }
        ]),
    ],
    exports: [InfrastructureObjectService]
})
export class InfrastructureObjectModule {}
