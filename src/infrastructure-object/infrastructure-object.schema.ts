import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { InfrastructureObjectDamageType } from "src/shared/enums/infrastructure-object-damage-type.enum";
import { Region } from "src/shared/enums/region.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Mongoose } from "mongoose";

@Schema()
export class InfrastructureObject {
    @ApiProperty()
    @Prop()
    name: string;

    @ApiProperty()
    @Prop()
    damageAssessmentInUAH: number;

    @ApiProperty()
    @Prop()
    generalAssessmentInUAH: number;

    @ApiProperty()
    @Prop()
    region: Region

    @ApiProperty()
    @Prop()
    damageType: InfrastructureObjectDamageType;

    @ApiProperty()
    @Prop({ timestamps: true })
    damagedAt: Date;
}

export const InfrastructureObjectSchema = SchemaFactory.createForClass(InfrastructureObject);