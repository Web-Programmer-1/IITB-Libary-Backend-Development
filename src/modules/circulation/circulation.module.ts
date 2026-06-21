import { Module } from '@nestjs/common';
import { CirculationController } from './circulation.controller';
import { CirculationService } from './circulation.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [CirculationController],
  providers: [CirculationService],
})
export class CirculationModule {}
