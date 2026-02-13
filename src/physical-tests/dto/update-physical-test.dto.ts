import { PartialType } from '@nestjs/swagger';
import { CreatePhysicalTestDto } from './create-physical-test.dto.js';

export class UpdatePhysicalTestDto extends PartialType(CreatePhysicalTestDto) {}
