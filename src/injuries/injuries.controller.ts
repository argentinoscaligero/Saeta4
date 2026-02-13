import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjuriesService } from './injuries.service.js';
import { CreateInjuryDto } from './dto/create-injury.dto.js';
import { UpdateInjuryDto } from './dto/update-injury.dto.js';

@ApiTags('Injuries')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('injuries')
export class InjuriesController {
  constructor(private readonly injuriesService: InjuriesService) {}

  @Post()
  @ApiOperation({ summary: 'Register an injury' })
  create(@Body() dto: CreateInjuryDto) {
    return this.injuriesService.create(dto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all currently active injuries' })
  findActive() {
    return this.injuriesService.findActive();
  }

  @Get('player/:playerId')
  @ApiOperation({ summary: 'Get injury history for a player' })
  findByPlayer(@Param('playerId', ParseUUIDPipe) playerId: string) {
    return this.injuriesService.findByPlayer(playerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific injury record' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.injuriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an injury record' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateInjuryDto,
  ) {
    return this.injuriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an injury record' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.injuriesService.remove(id);
  }
}
