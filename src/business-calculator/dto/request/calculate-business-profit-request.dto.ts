import { ApiProperty } from "@nestjs/swagger";
import { BusinessType } from "src/shared/enums/business-type.enum";
import { IsEnum, IsNumber } from "class-validator";

export class CalculateBusinessProfitRequestDto {
    @ApiProperty()
    @IsEnum(BusinessType)
    readonly businessType: BusinessType;

    @ApiProperty()
    @IsNumber()
    readonly squareMeters: number;

    @ApiProperty()
    @IsNumber()
    readonly employeesCount: number;

    @ApiProperty()
    @IsNumber()
    readonly investmentAmount: number;
}