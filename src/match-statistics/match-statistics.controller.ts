import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MatchStatisticsService } from './match-statistics.service.js';
import { CreateMatchStatisticDto } from './dto/create-match-statistic.dto.js';

@ApiTags('Match Statistics')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('match-statistics')
export class MatchStatisticsController {
  constructor(private readonly statsService: MatchStatisticsService) {}

  @Post()
  @ApiOperation({ summary: 'Tag a match statistic' })
  create(@Body() dto: CreateMatchStatisticDto) {
    return this.statsService.create(dto);
  }

  @Get('match/:matchId')
  @ApiOperation({ summary: 'Get statistics for a match' })
  @ApiQuery({ name: 'tagger', required: false, description: '1 or 2' })
  findByMatch(
    @Param('matchId', ParseUUIDPipe) matchId: string,
    @Query('tagger') tagger?: string,
  ) {
    return this.statsService.findByMatch(matchId, tagger ? +tagger : undefined);
  }

  @Get('player/:playerId')
  @ApiOperation({ summary: 'Get all statistics for a player' })
  findByPlayer(@Param('playerId', ParseUUIDPipe) playerId: string) {
    return this.statsService.findByPlayer(playerId);
  }
}
