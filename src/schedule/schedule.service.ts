import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createScheduleDto: CreateScheduleDto) {
    const schedule = this.scheduleRepository.create(createScheduleDto);
    await this.scheduleRepository.save(schedule);
    return schedule;

  }

  async findAll(page: number, limit: number) {

    const [schedules, total] = await this.scheduleRepository.findAndCount({
      order: {
        scheduleDate: 'DESC',
        scheduleTime: 'ASC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  
    const result = await Promise.all(schedules.map(async schedule => {
      const user = await this.userRepository.findOne({ where: { id: schedule.userId } });
      return {
        ...schedule,
        username: user.name,
      };
    }));
  
    if (!schedules.length) {
      throw new HttpException('Schedules not found', HttpStatus.NOT_FOUND);
    }
  
    return {
      data: result,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const schedule = await this.scheduleRepository.findOne({
      where: [
        { id },
      ],
    });
    if (!schedule) {
      throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND);
    }
    return schedule;
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    await this.findOne(id);
    await this.scheduleRepository.update(id, updateScheduleDto);
    return updateScheduleDto;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.scheduleRepository.delete(id);
    return new HttpException('Schedule deleted', HttpStatus.OK);
  }
}
