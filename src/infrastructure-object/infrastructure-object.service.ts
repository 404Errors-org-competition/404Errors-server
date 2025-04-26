import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { InfrastructureObject } from "src/infrastructure-object/infrastructure-object.schema";
import { Model } from "mongoose";
import {
    GetDamagedInfrastructureObjectsDto
} from "src/infrastructure-object/dto/request/get-damaged-infrastructure-objects.dto";
import { Region } from "src/shared/enums/region.enum";
import {
    InfrastructureObjectsResponseDto
} from "src/infrastructure-object/dto/response/infrastructure-objects-response.dto";

@Injectable()
export class InfrastructureObjectService {
    constructor(
        @InjectModel(InfrastructureObject.name)
        private readonly infrastructureObjectModel: Model<InfrastructureObject>
    ) {}

    async getInfrastructureObjectsByDamageType(
        getDamagedInfrastructureObjectsDto: GetDamagedInfrastructureObjectsDto
    ): Promise<InfrastructureObjectsResponseDto> {
        const { category, damageType } = getDamagedInfrastructureObjectsDto;
        const infrastructureObjects = await this.infrastructureObjectModel.find({
            category,
            damageType
        });

        const overallDamageAssessmentInUkraine = infrastructureObjects
            .reduce((accumulator: number, infrastructureObject: InfrastructureObject): number => {
                return accumulator + infrastructureObject.damageAssessmentInUAH;
            }, 0);

        const damageAssessmentByRegions = Object.values(Region).map((region) => {
            const damageAssessment = infrastructureObjects
                .filter((infrastructureObject) => infrastructureObject.region === region)
                .reduce((accumulator: number, infrastructureObject) => {
                    return accumulator + infrastructureObject.damageAssessmentInUAH;
                }, 0);

            return { region, damageAssessment };
        });

        return {
            infrastructureObjects,
            damageAssessmentByRegions,
            overallDamageAssessmentInUkraine
        };
    }
}
