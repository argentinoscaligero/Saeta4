import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrainingPlanDto {
  @ApiProperty({ example: 'Circuito de posesión 4v2' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2026-02-15' })
  @IsString()
  @IsNotEmpty()
  planDate: string;

  @ApiPropertyOptional({ example: 'Mejorar posesión bajo presión' })
  @IsString()
  @IsOptional()
  objective?: string;

  @ApiPropertyOptional({ example: 90 })
  @IsInt()
  @IsOptional()
  durationMinutes?: number;

  @ApiPropertyOptional({ description: 'JSON with drill positions/movements on pitch' })
  @IsObject()
  @IsOptional()
  drillData?: Record<string, any>;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty()
  @IsUUID()
  teamId: string;

  @ApiProperty()
  @IsUUID()
  createdById: string;
}
