import { BusinessType } from "src/shared/enums/business-type.enum";
import { BusinessBaseExpendituresDto } from "src/shared/dto/business-base-expenditures.dto";

export const BusinessBaseExpendituresData: Record<BusinessType, BusinessBaseExpendituresDto> = {
    [BusinessType.COFFEE]: {
        averageRevenuePerSquareMeter: 30,
        averageSalaryPerEmployee: 500,
        averageOtherExpenses: 1000,
    },
    [BusinessType.FAST_FOOD]: {
        averageRevenuePerSquareMeter: 50,
        averageSalaryPerEmployee: 600,
        averageOtherExpenses: 2000,
    },
    [BusinessType.RESTAURANT]: {
        averageRevenuePerSquareMeter: 60,
        averageSalaryPerEmployee: 700,
        averageOtherExpenses: 3000,
    },
    [BusinessType.CLOTHES]: {
        averageRevenuePerSquareMeter: 40,
        averageSalaryPerEmployee: 450,
        averageOtherExpenses: 1500,
    },
    [BusinessType.GROCERY]: {
        averageRevenuePerSquareMeter: 35,
        averageSalaryPerEmployee: 500,
        averageOtherExpenses: 1200,
    },
    [BusinessType.BAKERY]: {
        averageRevenuePerSquareMeter: 45,
        averageSalaryPerEmployee: 500,
        averageOtherExpenses: 1800,
    },
};