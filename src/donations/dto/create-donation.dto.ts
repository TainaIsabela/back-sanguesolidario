import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, Matches } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class CreateDonationDto {
    @ApiProperty({
        description: 'ID do usuário',
    })
    @IsString()
    userId: string;

    @ApiProperty({
        description: 'Data da Doação',
        example: '2021-09-01T00:00:00.000Z'
    })
    @IsDate()
    @Type(() => Date)
    donationDate: Date;

    @ApiProperty({
        description: 'Observações da Doação',
        example: 'Minha pressão caiu após a doação'
    })
    @IsString()
    notes: string;
}
