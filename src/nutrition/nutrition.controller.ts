import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NutritionService } from './nutrition.service.js';
import { CreateNutritionRecordDto } from './dto/create-nutrition-record.dto.js';

@ApiTags('Nutrition')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a nutrition record for a player' })
  create(@Body() dto: CreateNutritionRecordDto) {
    return this.nutritionService.create(dto);
  }

  @Get('player/:playerId')
  @ApiOperation({ summary: 'Get all nutrition records for a player' })
  findByPlayer(@Param('playerId', ParseUUIDPipe) playerId: string) {
    return this.nutritionService.findByPlayer(playerId);
  }

  @Get('player/:playerId/evolution')
  @ApiOperation({ summary: 'Get weight/BMI evolution for a player' })
  getEvolution(@Param('playerId', ParseUUIDPipe) playerId: string) {
    return this.nutritionService.getEvolution(playerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific nutrition record' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.nutritionService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a nutrition record' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.nutritionService.remove(id);
  }
}
