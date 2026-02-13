import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Attendance } from './entities/attendance.entity.js';
import { CreateAttendanceDto } from './dto/create-attendance.dto.js';
import { BulkAttendanceDto } from './dto/bulk-attendance.dto.js';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  create(dto: CreateAttendanceDto) {
    const record = this.attendanceRepository.create(dto);
    return this.attendanceRepository.save(record);
  }

  async createBulk(dto: BulkAttendanceDto) {
    const records = this.attendanceRepository.create(dto.records);
    return this.attendanceRepository.save(records);
  }

  findByTeamAndDate(teamId: string, date: string) {
    return this.attendanceRepository.find({
      where: { teamId, date: new Date(date) },
      relations: ['player'],
    });
  }

  findByPlayer(playerId: string) {
    return this.attendanceRepository.find({
      where: { playerId },
      order: { date: 'DESC' },
    });
  }

  findByTeamAndRange(teamId: string, from: string, to: string) {
    return this.attendanceRepository.find({
      where: {
        teamId,
        date: Between(new Date(from), new Date(to)),
      },
      relations: ['player'],
      order: { date: 'DESC' },
    });
  }
}
