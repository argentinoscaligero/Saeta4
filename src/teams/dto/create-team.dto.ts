import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ example: 'Sub-17 A' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Primera' })
  @IsString()
  @IsOptional()
  division?: string;

  @ApiPropertyOptional({ example: 'Sub-17' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: '2026' })
  @IsString()
  @IsOptional()
  season?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  coachId?: string;
}
