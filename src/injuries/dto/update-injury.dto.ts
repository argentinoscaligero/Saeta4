import { PartialType } from '@nestjs/swagger';
import { CreateInjuryDto } from './create-injury.dto.js';

export class UpdateInjuryDto extends PartialType(CreateInjuryDto) {}
