import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ example: 'Lionel' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Messi' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({ example: '30123456' })
  @IsString()
  @IsOptional()
  documentNumber?: string;

  @ApiPropertyOptional({ example: '1987-06-24' })
  @IsString()
  @IsOptional()
  birthDate?: string;

  @ApiPropertyOptional({ example: 'Argentina' })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiPropertyOptional({ example: 'Delantero' })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiPropertyOptional({ example: 10 })
  @IsNumber()
  @IsOptional()
  shirtNumber?: number;

  @ApiPropertyOptional({ example: 'Izquierdo' })
  @IsString()
  @IsOptional()
  dominantFoot?: string;

  @ApiPropertyOptional({ example: '+54 11 1234-5678' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'jugador@email.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'Av. Siempreviva 742' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'Buenos Aires' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'Jorge Messi' })
  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @ApiPropertyOptional({ example: '+54 11 9876-5432' })
  @IsString()
  @IsOptional()
  emergencyPhone?: string;

  @ApiPropertyOptional({ example: 'A+' })
  @IsString()
  @IsOptional()
  bloodType?: string;

  @ApiPropertyOptional({ example: 'OSDE' })
  @IsString()
  @IsOptional()
  medicalInsurance?: string;

  @ApiPropertyOptional({ example: 1.7 })
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiPropertyOptional({ example: 72.0 })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  teamId?: string;
}
