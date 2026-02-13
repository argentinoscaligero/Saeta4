import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePhysicalTestDto {
  @ApiProperty({ example: 'Yo-Yo Test' })
  @IsString()
  @IsNotEmpty()
  testName: string;

  @ApiProperty({ example: '2026-02-10' })
  @IsString()
  @IsNotEmpty()
  testDate: string;

  @ApiPropertyOptional({ example: 21.5 })
  @IsNumber()
  @IsOptional()
  result?: number;

  @ApiPropertyOptional({ example: 'km/h' })
  @IsString()
  @IsOptional()
  unit?: string;

  @ApiPropertyOptional({ example: 'Resistencia' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  observations?: string;

  @ApiPropertyOptional({ description: 'Detailed test data (multi-attempt, etc.)' })
  @IsObject()
  @IsOptional()
  detailData?: Record<string, any>;

  @ApiProperty()
  @IsUUID()
  playerId: string;
}
