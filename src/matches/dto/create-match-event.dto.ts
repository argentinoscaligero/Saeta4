import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MatchEventType } from '../../common/enums/match-event-type.enum.js';

export class CreateMatchEventDto {
  @ApiProperty({ enum: MatchEventType })
  @IsEnum(MatchEventType)
  type: MatchEventType;

  @ApiPropertyOptional({ example: 35 })
  @IsInt()
  @IsOptional()
  minute?: number;

  @ApiPropertyOptional({ example: 'Gol de cabeza' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsUUID()
  matchId: string;

  @ApiProperty()
  @IsUUID()
  playerId: string;
}

export class CreateMatchSquadDto {
  @ApiProperty()
  @IsUUID()
  matchId: string;

  @ApiProperty()
  @IsUUID()
  playerId: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isStarter?: boolean;

  @ApiPropertyOptional({ example: 10 })
  @IsInt()
  @IsOptional()
  shirtNumber?: number;
}
