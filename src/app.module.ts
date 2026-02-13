import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { TeamsModule } from './teams/teams.module.js';
import { PlayersModule } from './players/players.module.js';
import { AttendanceModule } from './attendance/attendance.module.js';
import { MatchesModule } from './matches/matches.module.js';
import { MatchStatisticsModule } from './match-statistics/match-statistics.module.js';
import { TrainingPlansModule } from './training-plans/training-plans.module.js';
import { PhysicalTestsModule } from './physical-tests/physical-tests.module.js';
import { NutritionModule } from './nutrition/nutrition.module.js';
import { InjuriesModule } from './injuries/injuries.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USERNAME', 'postgres'),
        password: config.get('DB_PASSWORD', 'postgres'),
        database: config.get('DB_NAME', 'saeta4'),
        autoLoadEntities: true,
        synchronize: true, // Disable in production
      }),
    }),
    AuthModule,
    TeamsModule,
    PlayersModule,
    AttendanceModule,
    MatchesModule,
    MatchStatisticsModule,
    TrainingPlansModule,
    PhysicalTestsModule,
    NutritionModule,
    InjuriesModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
