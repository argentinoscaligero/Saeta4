import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMatchStatisticDto {
  @ApiProperty({ example: 1, description: '1 = general tagger, 2 = shooting tagger' })
  @IsInt()
  @Min(1)
  @Max(2)
  tagger: number;

  @ApiPropertyOptional({ example: 'Pase' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 'Zona 3' })
  @IsString()
  @IsOptional()
  pitchZone?: string;

  @ApiPropertyOptional({ example: 'Contraataque' })
  @IsString()
  @IsOptional()
  playType?: string;

  @ApiPropertyOptional({ example: 'Remate cruzado' })
  @IsString()
  @IsOptional()
  shotType?: string;

  @ApiPropertyOptional({ example: 'Zona A' })
  @IsString()
  @IsOptional()
  areaZone?: string;

  @ApiPropertyOptional({ example: 'On target' })
  @IsString()
  @IsOptional()
  outcome?: string;

  @ApiPropertyOptional({ example: 42 })
  @IsInt()
  @IsOptional()
  minute?: number;

  @ApiProperty()
  @IsUUID()
  matchId: string;

  @ApiProperty()
  @IsUUID()
  playerId: string;
}
