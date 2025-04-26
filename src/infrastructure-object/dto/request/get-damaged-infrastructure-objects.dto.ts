import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { InfrastructureObjectCategory } from "src/shared/enums/infrastructure-object-category";
import { InfrastructureObjectDamageType } from "src/shared/enums/infrastructure-object-damage-type.enum";

export class GetDamagedInfrastructureObjectsDto {
    @ApiProperty()
    @IsEnum(InfrastructureObjectCategory)
    category: InfrastructureObjectCategory;

    @ApiProperty()
    @IsEnum(InfrastructureObjectDamageType)
    damageType: InfrastructureObjectDamageType;
}