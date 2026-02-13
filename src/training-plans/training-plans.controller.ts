import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TrainingPlansService } from './training-plans.service.js';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto.js';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto.js';

@ApiTags('Training Plans')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('training-plans')
export class TrainingPlansController {
  constructor(private readonly plansService: TrainingPlansService) {}

  @Post()
  @ApiOperation({ summary: 'Create a training plan' })
  create(@Body() dto: CreateTrainingPlanDto) {
    return this.plansService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List training plans' })
  @ApiQuery({ name: 'teamId', required: false })
  findAll(@Query('teamId') teamId?: string) {
    return this.plansService.findAll(teamId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a training plan by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.plansService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a training plan' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrainingPlanDto,
  ) {
    return this.plansService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a training plan' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.plansService.remove(id);
  }
}
