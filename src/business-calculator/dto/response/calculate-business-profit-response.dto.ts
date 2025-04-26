import { ApiProperty } from "@nestjs/swagger";
import { Region } from "src/shared/enums/region.enum";

export class CalculateBusinessProfitResponseDto {
    @ApiProperty()
    readonly region: Region;

    @ApiProperty()
    readonly netIncomePerMonth: number;

    @ApiProperty()
    readonly lostAmountDueToAlerts: number;

    @ApiProperty()
    readonly paybackPeriodMonths: number;
}