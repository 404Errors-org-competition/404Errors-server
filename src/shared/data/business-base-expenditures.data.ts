import { BusinessType } from "src/shared/enums/business-type.enum";
import { BusinessBaseExpendituresDto } from "src/shared/dto/business-base-expenditures.dto";

export const BusinessBaseExpendituresData: Record<BusinessType, BusinessBaseExpendituresDto> = {
    [BusinessType.COFFEE]: {
        averageRevenuePerSquareMeter: 30,
        averageSalaryPerEmployee: 450,
    },
    [BusinessType.FAST_FOOD]: {
        averageRevenuePerSquareMeter: 45,
        averageSalaryPerEmployee: 220,
    },
    [BusinessType.RESTAURANT]: {
        averageRevenuePerSquareMeter: 45,
        averageSalaryPerEmployee: 350,
    },
    [BusinessType.CLOTHES]: {
        averageRevenuePerSquareMeter: 40,
        averageSalaryPerEmployee: 350,
    },
    [BusinessType.GROCERY]: {
        averageRevenuePerSquareMeter: 35,
        averageSalaryPerEmployee: 250,
    },
    [BusinessType.BAKERY]: {
        averageRevenuePerSquareMeter: 35,
        averageSalaryPerEmployee: 200,
    },
};