import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from '@nestjs/class-validator';

export class CreateCampaignDto {

    @ApiProperty({
        description: 'Nome da Paciente'
    })
    @IsString()
    patientName: string;

    @ApiProperty({
        description: 'Tipo Sanguíneo do paciente'
    })
    @IsString()
    bloodType: string;

    @ApiProperty({
        description: 'Tipos Sanguíneos compatíveis'
    })
    @IsString({ each: true })
    compatibleBloodTypes: Array<string>;

    isActive = true;
}
