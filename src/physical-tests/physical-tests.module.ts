import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalTestsService } from './physical-tests.service.js';
import { PhysicalTestsController } from './physical-tests.controller.js';
import { PhysicalTest } from './entities/physical-test.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalTest])],
  controllers: [PhysicalTestsController],
  providers: [PhysicalTestsService],
  exports: [PhysicalTestsService],
})
export class PhysicalTestsModule {}
