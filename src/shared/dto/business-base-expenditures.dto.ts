import { ApiProperty } from "@nestjs/swagger";

export class BusinessBaseExpendituresDto {
    @ApiProperty()
    readonly averageRevenuePerSquareMeter: number;

    @ApiProperty()
    readonly averageSalaryPerEmployee: number;

    @ApiProperty()
    readonly averageOtherExpenses: number;
}