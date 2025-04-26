import { InfrastructureObject } from "src/infrastructure-object/infrastructure-object.schema";

export class RegionDamageAssessmentDto {
    readonly region: string;
    readonly damageAssessment: number;
}

export class InfrastructureObjectsResponseDto {
    readonly infrastructureObjects: Array<InfrastructureObject>;
    readonly damageAssessmentByRegions: Array<RegionDamageAssessmentDto>;
    readonly overallDamageAssessmentInUkraine: number;
}
