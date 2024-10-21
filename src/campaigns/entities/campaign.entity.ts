import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Campaign {

    @ApiProperty({ description: 'ID da Campanha' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Nome da Paciente'
    })
    @Column()   
    patientName: string;

    @ApiProperty({
        description: 'Tipo Sanguíneo do paciente'
    })
    @Column()   
    bloodType: string;

    @ApiProperty({
        description: 'Tipos Sanguíneos compatíveis'
    })
    @Column('text', { array: true })
    compatibleBloodTypes: string[];

    @ApiProperty({
        description: 'Se a campanha está ativa ou não'
    })
    @Column()
    isActive: boolean;
}

export const campaignEntity = {
    id: 'Id',
    patientName: 'patientName',
    bloodType: 'bloodType',
    compatibleBloodTypes: 'compatibleBloodTypes',
    isActive: 'isActive',
};