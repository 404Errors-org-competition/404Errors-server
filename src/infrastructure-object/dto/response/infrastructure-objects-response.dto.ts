import { InfrastructureObject } from "src/infrastructure-object/infrastructure-object.schema";
import { ApiProperty } from "@nestjs/swagger";

export class RegionDamageAssessmentDto {
    @ApiProperty()
    readonly region: string;

    @ApiProperty()
    readonly damageAssessment: number;
}

export class InfrastructureObjectsResponseDto {
    @ApiProperty({ type: [InfrastructureObject] })
    readonly infrastructureObjects: Array<InfrastructureObject>;

    @ApiProperty({ type: [RegionDamageAssessmentDto] })
    readonly damageAssessmentByRegions: Array<RegionDamageAssessmentDto>;

    @ApiProperty()
    readonly overallDamageAssessmentInUkraine: number;
}
