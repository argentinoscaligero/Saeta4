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
import { PhysicalTestsService } from './physical-tests.service.js';
import { CreatePhysicalTestDto } from './dto/create-physical-test.dto.js';
import { UpdatePhysicalTestDto } from './dto/update-physical-test.dto.js';

@ApiTags('Physical Tests')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('physical-tests')
export class PhysicalTestsController {
  constructor(private readonly testsService: PhysicalTestsService) {}

  @Post()
  @ApiOperation({ summary: 'Register a physical test result' })
  create(@Body() dto: CreatePhysicalTestDto) {
    return this.testsService.create(dto);
  }

  @Get('player/:playerId')
  @ApiOperation({ summary: 'Get all test results for a player' })
  findByPlayer(@Param('playerId', ParseUUIDPipe) playerId: string) {
    return this.testsService.findByPlayer(playerId);
  }

  @Get('player/:playerId/evolution')
  @ApiOperation({ summary: 'Get evolution of a player in a specific test' })
  @ApiQuery({ name: 'testName', required: true })
  getEvolution(
    @Param('playerId', ParseUUIDPipe) playerId: string,
    @Query('testName') testName: string,
  ) {
    return this.testsService.getEvolution(playerId, testName);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific test result' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.testsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a physical test result' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePhysicalTestDto,
  ) {
    return this.testsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a physical test result' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.testsService.remove(id);
  }
}
