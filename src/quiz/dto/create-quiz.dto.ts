import { ApiProperty } from '@nestjs/swagger';
import { IsString } from '@nestjs/class-validator';

export class CreateQuizDto {

    @ApiProperty({
        description: 'Resultado do quiz',
    })
    @IsString()
    result: string;

    @ApiProperty({
        description: 'ID do usuário',
    })
    @IsString()
    userId: string;

    @ApiProperty({
        description: 'Data de criação do quiz',
    })
    dateResult: Date;
}
