import { Module } from '@nestjs/common';
import { BusinessCalculatorService } from './business-calculator.service';
import { BusinessCalculatorController } from './business-calculator.controller';

@Module({
  providers: [BusinessCalculatorService],
  controllers: [BusinessCalculatorController]
})
export class BusinessCalculatorModule {}
