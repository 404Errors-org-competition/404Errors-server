import { Injectable, NotFoundException } from '@nestjs/common';
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
        const totalRevenue = this.calculateRevenue(calculateBusinessProfitRequestDto);
        const totalExpenses = this.calculateExpenses(calculateBusinessProfitRequestDto);
        const lostAmountDueToAlerts = this.calculateLostAmountDueToAlerts(calculateBusinessProfitRequestDto, region);

        const netIncomePerMonth = totalRevenue - totalExpenses - lostAmountDueToAlerts;
        const paybackPeriodMonths = calculateBusinessProfitRequestDto.investmentAmount / netIncomePerMonth ;

        return {
            region,
            netIncomePerMonth,
            lostAmountDueToAlerts,
            paybackPeriodMonths: netIncomePerMonth >= 0 ? Math.ceil(paybackPeriodMonths) : null
        };
    }

    private calculateRevenue(
        calculateBusinessProfitRequestDto: CalculateBusinessProfitRequestDto,
    ): number {
        const baseData = BusinessBaseExpendituresData[calculateBusinessProfitRequestDto.businessType];
        if (!baseData) {
            throw new NotFoundException(
                `Base expenditures data not found for business type: ${calculateBusinessProfitRequestDto.businessType}`
            );
        }

        return baseData.averageSalaryPerEmployee * 15;
    }

    private calculateExpenses(
        calculateBusinessProfitRequestDto: CalculateBusinessProfitRequestDto
    ): number {
        const baseData = BusinessBaseExpendituresData[calculateBusinessProfitRequestDto.businessType];
        if (!baseData) {
            throw new NotFoundException(
                `Base expenditures data not found for business type: ${calculateBusinessProfitRequestDto.businessType}`
            );
        }

        const expensesForEmployees = calculateBusinessProfitRequestDto.employeesCount * baseData.averageSalaryPerEmployee;
        const expensesForArea = baseData.averageRevenuePerSquareMeter * calculateBusinessProfitRequestDto.squareMeters;

        return expensesForEmployees + expensesForArea;
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

        const workingHoursPerDay = 12;
        const totalWorkingHoursWithAlarms = workingHoursPerDay - alarmDurationHours;
        const totalRevenue = this.calculateRevenue(calculateBusinessProfitRequestDto);

        const lostAmountDueToAlerts = totalRevenue - (totalWorkingHoursWithAlarms * totalRevenue / 12);
        return lostAmountDueToAlerts;
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
            [Region.CHERNIVTSI]: "chernivtsi",
        };

        return mapping[region] || "";
    }}
