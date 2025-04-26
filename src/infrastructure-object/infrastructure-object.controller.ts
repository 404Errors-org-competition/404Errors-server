import { Controller, Get } from '@nestjs/common';
import { InfrastructureObjectService } from './infrastructure-object.service';

@Controller('infrastructure-object')
export class InfrastructureObjectController {
    constructor(private readonly infrastructureObjectService: InfrastructureObjectService) {}

    @Get()
    async getInfrastructureObjects() {}
}
