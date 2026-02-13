import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNutritionRecordDto {
  @ApiProperty({ example: '2026-02-12' })
  @IsString()
  @IsNotEmpty()
  recordDate: string;

  @ApiPropertyOptional({ example: 72.5 })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({ example: 1.75 })
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiPropertyOptional({ example: 23.7 })
  @IsNumber()
  @IsOptional()
  bmi?: number;

  @ApiPropertyOptional({ example: 12.5 })
  @IsNumber()
  @IsOptional()
  bodyFatPercentage?: number;

  @ApiPropertyOptional({ example: 35.2 })
  @IsNumber()
  @IsOptional()
  muscleMass?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  observations?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  detailData?: Record<string, any>;

  @ApiProperty()
  @IsUUID()
  playerId: string;
}
