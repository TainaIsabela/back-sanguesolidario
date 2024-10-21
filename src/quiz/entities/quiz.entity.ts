import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity()
export class Quiz {

    @ApiProperty({ description: 'ID do usuário' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Resultado do quiz',
    })
    @Column()
    result: string;

    @ApiProperty({
        description: 'ID do usuário',
    })
    @Column()
    userId: string;

    @ApiProperty({
        description: 'Data de criação do quiz',
    })
    @Column()
    dateResult: Date;

}

export const quizEntity = {
    id: 'Id',
    result: 'result',
    userId: 'userId',
    dateResult: 'dateResult',
}
