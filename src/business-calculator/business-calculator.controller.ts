import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { BusinessCalculatorService } from "src/business-calculator/business-calculator.service";
import {
    CalculateBusinessProfitRequestDto
} from "src/business-calculator/dto/request/calculate-business-profit-request.dto";
import {
    CalculateBusinessProfitResponseDto
} from "src/business-calculator/dto/response/calculate-business-profit-response.dto";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('business-calculator')
export class BusinessCalculatorController {
    constructor(private readonly businessCalculatorService: BusinessCalculatorService) {}

    @ApiOperation({
        summary: '' +
            'Counting business profit and losses due to air alerts in different regions '
    })
    @ApiBody({ type: CalculateBusinessProfitRequestDto })
    @ApiResponse({ type: CalculateBusinessProfitResponseDto, status: HttpStatus.CREATED })
    @Post()
    async calculateBusinessProfit(
        @Body() calculateBusinessProfitRequestDto: CalculateBusinessProfitRequestDto
    ): Promise<Array<CalculateBusinessProfitResponseDto>> {
        return this.businessCalculatorService.calculateTotalProfit(calculateBusinessProfitRequestDto);
    }
}
