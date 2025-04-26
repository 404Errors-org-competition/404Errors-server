import { Injectable } from '@nestjs/common';
import { CalculateBusinessProfitRequestDto } from './dto/request/calculate-business-profit-request.dto';
import {
    CalculateBusinessProfitResponseDto
} from "src/business-calculator/dto/response/calculate-business-profit-response.dto";
import { Region } from "src/shared/enums/region.enum";
import { AverageAlarmDurationInRegions } from "src/shared/data/average-alarm-duration-in-regions.data";
import { BusinessBaseExpendituresData } from "src/shared/data/business-base-expenditures.data";

@Injectable()
export class BusinessCalculatorService {
    calculateTotalProfit(
        calculateBusinessProfitRequestDto: CalculateBusinessProfitRequestDto
    ): Array<CalculateBusinessProfitResponseDto> {
        const regions = Object.values(Region);

        const results = regions.map(region =>
            this.calculateProfitForRegion(calculateBusinessProfitRequestDto, region)
        );

        return results.sort(
            (
                previousCalculationResult: CalculateBusinessProfitResponseDto,
                nextCalculationResult: CalculateBusinessProfitResponseDto) =>
                    previousCalculationResult.netIncomePerMonth - nextCalculationResult.netIncomePerMonth
            );
    }

    private calculateProfitForRegion(
        calculateBusinessProfitRequestDto: CalculateBusinessProfitRequestDto,
        region: Region
    ): CalculateBusinessProfitResponseDto {
        const totalRevenue = this.calculateRevenue(calculateBusinessProfitRequestDto, region);
        console.log("totalRevenue", totalRevenue);
        const totalExpenses = this.calculateExpenses(calculateBusinessProfitRequestDto);
        console.log("totalExpenses", totalExpenses);
        const lostAmountDueToAlerts = this.calculateLostAmountDueToAlerts(calculateBusinessProfitRequestDto, region);
        console.log("lostAmountDueToAlerts", lostAmountDueToAlerts);

        const netIncomePerMonth = totalRevenue - totalExpenses - lostAmountDueToAlerts;
        const paybackPeriodMonths =
            calculateBusinessProfitRequestDto.investmentAmount / (netIncomePerMonth > 0 ? netIncomePerMonth : 1);

        return {
            region,
            netIncomePerMonth,
            lostAmountDueToAlerts,
            paybackPeriodMonths: Math.ceil(paybackPeriodMonths)
        };
    }

    private calculateRevenue(
        calculateBusinessProfitRequestDto: CalculateBusinessProfitRequestDto,
        region: Region
    ): number {
        const baseData = BusinessBaseExpendituresData[calculateBusinessProfitRequestDto.businessType];
        console.log("BaseData", baseData);

        if (!baseData) {
            throw new Error(`Base expenditures data not found for business type: ${calculateBusinessProfitRequestDto.businessType}`);
        }

        const revenue = calculateBusinessProfitRequestDto.squareMeters * baseData.averageRevenuePerSquareMeter;
        return revenue;
    }

    private calculateExpenses(
        calculateBusinessProfitRequestDto: CalculateBusinessProfitRequestDto
    ): number {
        const baseData = BusinessBaseExpendituresData[calculateBusinessProfitRequestDto.businessType];
        console.log("BaseData", baseData);

        if (!baseData) {
            throw new Error(`Base expenditures data not found for business type: ${calculateBusinessProfitRequestDto.businessType}`);
        }

        const salaryExpenses = calculateBusinessProfitRequestDto.employeesCount * baseData.averageSalaryPerEmployee;
        const otherExpenses = baseData.averageOtherExpenses;

        const totalExpenses = salaryExpenses + otherExpenses;
        return totalExpenses;
    }


    private calculateLostAmountDueToAlerts(
        calculateBusinessProfitRequestDto: CalculateBusinessProfitRequestDto,
        region: Region
    ): number {
        const regionKey = this.mapRegionToAlarmDataKey(region);

        const alarmDurationHours = AverageAlarmDurationInRegions[regionKey as keyof typeof AverageAlarmDurationInRegions];

        if (alarmDurationHours == null) {
            return 0;
        }

        const workingHoursPerDay = 8;
        const workingDaysPerMonth = 22;
        const totalWorkingHoursPerMonth = workingHoursPerDay * workingDaysPerMonth;

        const baseRevenue = this.calculateRevenue(calculateBusinessProfitRequestDto, region);

        const lostRevenuePercentagePerDay = alarmDurationHours / workingHoursPerDay;
        const lostRevenuePerMonth = baseRevenue * lostRevenuePercentagePerDay * workingDaysPerMonth;

        return lostRevenuePerMonth;
    }

    private mapRegionToAlarmDataKey(region: Region): string {
        const mapping: Record<Region, keyof typeof AverageAlarmDurationInRegions> = {
            [Region.LVIV]: "lviv",
            [Region.KYIV]: "kyiv",
            [Region.MYKOLAIV]: "mykolaiv",
            [Region.SUMY]: "sumy",
            [Region.ODESA]: "odesa",
            [Region.DNIPROPETROVSK]: "dnipro",
            [Region.DONETSK]: "donetsk",
            [Region.CHERNIHIV]: "chernihiv",
            [Region.ZAPORIZHZHIA]: "zaporizhzhia",
            [Region.VINNYTSIA]: "vinnytsia",
            [Region.ZHYTOMYR]: "zhytomyr",
            [Region.KHMELNYTSKYI]: "khmelnytskyi",
            [Region.TERNOPIL]: "ternopil",
            [Region.IVANO_FRANKIVSK]: "ivanoFrankivsk",
            [Region.RIVNE]: "rivne",
            [Region.VOLYN]: "volyn",
            [Region.ZAKARPATTIA]: "zakarpattia",
            [Region.KIROVOHRAD]: "kirovohrad",
            [Region.POLTAVA]: "poltava",
            [Region.CHERKASY]: "cherkasy",
            [Region.LUHANSK]: "luhansk",
            [Region.KRYM]: "crimea",
            [Region.SEVASTOPOL]: "sevastopol",
            [Region.CHERNIVTSI]: "chernivtsi", // <-- ✅ added missing one!
        };

        return mapping[region] || "";
    }}
