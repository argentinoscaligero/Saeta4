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
import { AttendanceService } from './attendance.service.js';
import { CreateAttendanceDto } from './dto/create-attendance.dto.js';
import { BulkAttendanceDto } from './dto/bulk-attendance.dto.js';

@ApiTags('Attendance')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiOperation({ summary: 'Register single attendance record' })
  create(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.create(dto);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Register attendance for entire team at once' })
  createBulk(@Body() dto: BulkAttendanceDto) {
    return this.attendanceService.createBulk(dto);
  }

  @Get('team/:teamId')
  @ApiOperation({ summary: 'Get attendance by team and date range' })
  @ApiQuery({ name: 'date', required: false })
  @ApiQuery({ name: 'from', required: false })
  @ApiQuery({ name: 'to', required: false })
  findByTeam(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Query('date') date?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    if (date) return this.attendanceService.findByTeamAndDate(teamId, date);
    if (from && to)
      return this.attendanceService.findByTeamAndRange(teamId, from, to);
    return this.attendanceService.findByTeamAndDate(
      teamId,
      new Date().toISOString().split('T')[0],
    );
  }

  @Get('player/:playerId')
  @ApiOperation({ summary: 'Get attendance history for a player' })
  findByPlayer(@Param('playerId', ParseUUIDPipe) playerId: string) {
    return this.attendanceService.findByPlayer(playerId);
  }
}
