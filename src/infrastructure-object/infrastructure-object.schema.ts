import { Prop, Schema } from "@nestjs/mongoose";
import { InfrastructureObjectCategory } from "src/shared/enums/infrastructure-object-category";
import { InfrastructureObjectDamageType } from "src/shared/enums/infrastructure-object-damage-type.enum";
import { Region } from "src/shared/enums/region.enum";

@Schema()
export class InfrastructureObject {
    @Prop()
    name: string;

    @Prop()
    damageAssessmentInUAH: number;

    @Prop()
    generalAssessmentInUAH: number;

    @Prop()
    region: Region

    @Prop()
    category: InfrastructureObjectCategory;

    @Prop()
    damageType: InfrastructureObjectDamageType;

    @Prop({ timestamps: true })
    damagedAt: Date;
}