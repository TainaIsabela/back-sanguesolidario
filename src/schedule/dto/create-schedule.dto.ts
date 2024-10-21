import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, Matches } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class CreateScheduleDto {

    @ApiProperty({
        description: 'ID do usuário',
    })
    @IsString()
    userId: string;

    @ApiProperty({
        description: 'Data do Agendamento',
        example: '2021-09-01T00:00:00.000Z'
    })
    @IsDate()
    @Type(() => Date)
    scheduleDate: Date;

    @ApiProperty({
        description: 'Hora do Agendamento',
        example: '08:00'
    })
    @IsString()
    @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    scheduleTime: string;
}
