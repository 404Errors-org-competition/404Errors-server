import { Body, Controller, Post } from '@nestjs/common';
import { BusinessCalculatorService } from "src/business-calculator/business-calculator.service";
import {
    CalculateBusinessProfitRequestDto
} from "src/business-calculator/dto/request/calculate-business-profit-request.dto";
import {
    CalculateBusinessProfitResponseDto
} from "src/business-calculator/dto/response/calculate-business-profit-response.dto";

@Controller('business-calculator')
export class BusinessCalculatorController {
    constructor(private readonly businessCalculatorService: BusinessCalculatorService) {}

    @Post()
    async calculateBusinessProfit(
        @Body() calculateBusinessProfitRequestDto: CalculateBusinessProfitRequestDto
    ): Promise<Array<CalculateBusinessProfitResponseDto>> {
        return this.businessCalculatorService.calculateTotalProfit(calculateBusinessProfitRequestDto);
    }
}
