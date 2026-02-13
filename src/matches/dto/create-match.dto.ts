import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMatchDto {
  @ApiProperty({ example: '2026-03-15' })
  @IsString()
  @IsNotEmpty()
  matchDate: string;

  @ApiPropertyOptional({ example: 'River Plate' })
  @IsString()
  @IsOptional()
  opponent?: string;

  @ApiPropertyOptional({ example: 'Estadio Monumental' })
  @IsString()
  @IsOptional()
  venue?: string;

  @ApiPropertyOptional({ example: 'Liga Juvenil' })
  @IsString()
  @IsOptional()
  competition?: string;

  @ApiPropertyOptional({ example: 'Fecha 5' })
  @IsString()
  @IsOptional()
  matchDay?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsInt()
  @IsOptional()
  goalsFor?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  goalsAgainst?: number;

  @ApiPropertyOptional({ example: 'W' })
  @IsString()
  @IsOptional()
  result?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  observations?: string;

  @ApiProperty()
  @IsUUID()
  teamId: string;
}
