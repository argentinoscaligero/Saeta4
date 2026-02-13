import { Controller, Get, Param, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service.js';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get general overview statistics' })
  getOverview() {
    return this.dashboardService.getOverview();
  }

  @Get('goals-by-team')
  @ApiOperation({ summary: 'Get total goals grouped by team' })
  getGoalsByTeam() {
    return this.dashboardService.getGoalsByTeam();
  }

  @Get('attendance/:teamId')
  @ApiOperation({ summary: 'Get monthly attendance progress for a team' })
  @ApiQuery({ name: 'year', required: false, example: 2026 })
  getAttendanceByMonth(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Query('year') year?: string,
  ) {
    return this.dashboardService.getAttendanceByMonth(
      teamId,
      year ? +year : new Date().getFullYear(),
    );
  }
}
