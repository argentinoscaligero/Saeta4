import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInjuryDto {
  @ApiProperty({ example: 'Esguince' })
  @IsString()
  @IsNotEmpty()
  injuryType: string;

  @ApiPropertyOptional({ example: 'Esguince grado 2 de tobillo derecho' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2026-01-20' })
  @IsString()
  @IsNotEmpty()
  injuryDate: string;

  @ApiPropertyOptional({ example: '2026-03-01' })
  @IsString()
  @IsOptional()
  recoveryDate?: string;

  @ApiPropertyOptional({ example: 'Moderada' })
  @IsString()
  @IsOptional()
  severity?: string;

  @ApiPropertyOptional({ example: 'Tobillo derecho' })
  @IsString()
  @IsOptional()
  bodyPart?: string;

  @ApiPropertyOptional({ example: 'Fisioterapia + reposo' })
  @IsString()
  @IsOptional()
  treatment?: string;

  @ApiPropertyOptional({ example: 'En recuperación' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  observations?: string;

  @ApiProperty()
  @IsUUID()
  playerId: string;
}
