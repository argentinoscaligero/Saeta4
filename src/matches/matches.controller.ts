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
import { MatchesService } from './matches.service.js';
import { CreateMatchDto } from './dto/create-match.dto.js';
import { UpdateMatchDto } from './dto/update-match.dto.js';
import { CreateMatchEventDto, CreateMatchSquadDto } from './dto/create-match-event.dto.js';

@ApiTags('Matches')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a match' })
  create(@Body() dto: CreateMatchDto) {
    return this.matchesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List matches, optionally filtered by team' })
  @ApiQuery({ name: 'teamId', required: false })
  findAll(@Query('teamId') teamId?: string) {
    return this.matchesService.findAll(teamId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get match details' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.matchesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a match' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMatchDto,
  ) {
    return this.matchesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a match' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.matchesService.remove(id);
  }

  // Events (goals, cards, substitutions)
  @Post(':id/events')
  @ApiOperation({ summary: 'Add event to a match (goal, card, etc.)' })
  addEvent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateMatchEventDto,
  ) {
    dto.matchId = id;
    return this.matchesService.addEvent(dto);
  }

  @Get(':id/events')
  @ApiOperation({ summary: 'Get all events for a match' })
  findEvents(@Param('id', ParseUUIDPipe) id: string) {
    return this.matchesService.findEventsByMatch(id);
  }

  // Squad / Convocatoria
  @Post(':id/squad')
  @ApiOperation({ summary: 'Add player to match squad' })
  addSquadMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateMatchSquadDto,
  ) {
    dto.matchId = id;
    return this.matchesService.addSquadMember(dto);
  }

  @Get(':id/squad')
  @ApiOperation({ summary: 'Get match squad' })
  findSquad(@Param('id', ParseUUIDPipe) id: string) {
    return this.matchesService.findSquad(id);
  }
}
