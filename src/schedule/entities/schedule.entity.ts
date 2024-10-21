import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule {

    @ApiProperty({ description: 'ID do Agendamento' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'ID do usuário',
    })
    @Column()
    userId: string;

    @ApiProperty({
        description: 'Data do Agendamento',
    })
    @Column()
    scheduleDate: Date;

    @ApiProperty({
        description: 'Hora do Agendamento',
    })
    @Column()
    scheduleTime: string;

}
