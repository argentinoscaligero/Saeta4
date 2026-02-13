import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttendanceStatus } from '../../common/enums/attendance-status.enum.js';

export class CreateAttendanceDto {
  @ApiProperty({ example: '2026-02-12' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @ApiPropertyOptional({ example: 'Llegó tarde por lluvia' })
  @IsString()
  @IsOptional()
  observations?: string;

  @ApiProperty()
  @IsUUID()
  playerId: string;

  @ApiProperty()
  @IsUUID()
  teamId: string;
}
