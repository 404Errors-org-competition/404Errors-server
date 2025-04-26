import { Module } from '@nestjs/common';
import { InfrastructureObjectService } from './infrastructure-object.service';
import { InfrastructureObjectController } from './infrastructure-object.controller';

@Module({
  providers: [InfrastructureObjectService],
  controllers: [InfrastructureObjectController]
})
export class InfrastructureObjectModule {}
