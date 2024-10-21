import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Donation {

    @ApiProperty({ description: 'ID da Doação' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'ID do usuário',
    })
    @Column()
    userId: string;

    @ApiProperty({
        description: 'Data da Doação',
    })
    @Column()
    donationDate: Date;

    @ApiProperty({
        description: 'Observações da Doação',
    })
    @Column()
    notes: string;

}

export const donationEntity = {
    id: 'Id',
    userId: 'userId',
    donationDate: 'donationDate',
    notes: 'notes',
};
