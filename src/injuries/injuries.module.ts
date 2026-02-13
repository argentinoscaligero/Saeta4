import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjuriesService } from './injuries.service.js';
import { InjuriesController } from './injuries.controller.js';
import { Injury } from './entities/injury.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Injury])],
  controllers: [InjuriesController],
  providers: [InjuriesService],
  exports: [InjuriesService],
})
export class InjuriesModule {}
