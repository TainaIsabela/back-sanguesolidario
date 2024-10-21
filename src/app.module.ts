import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DonationsModule } from './donations/donations.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { QuizModule } from './quiz/quiz.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, userEntity } from './users/entities/user.entity';
import { Donation, donationEntity } from './donations/entities/donation.entity';
import { Campaign, campaignEntity } from './campaigns/entities/campaign.entity';
import { Quiz, quizEntity } from './quiz/entities/quiz.entity';
import { APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { ScheduleModule } from './schedule/schedule.module';
import { Schedule } from './schedule/entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.POSTGRES_DB,
      port: Number(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      entities: [User, Donation, Campaign, Quiz, Schedule],
      synchronize: true, 
    }),
    AuthModule, UsersModule, DonationsModule, CampaignsModule, QuizModule, ScheduleModule],
  controllers: [AppController],
  providers: [ AppService,
    {
      provide: 'APP_GUARD',
      useExisting: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    JwtAuthGuard
  ],
})
export class AppModule {}
