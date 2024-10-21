import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from '@nestjs/class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'Email utilizado pelo usuário',
        example: 'teste@gmail.com',
    })
    @IsString()
    email: string;

    @ApiProperty({
        description: 'Nome do usuário',
        example: 'Jane Doe',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: '********',
    })
    @IsString({ message: 'A senha deve ser uma string' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[^a-zA-Z0-9]).{8,}$/, {
        message: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número ou caractere especial',
    })
    password: string;

    @ApiProperty({
        description: 'Tipo sanguíneo do usuário',
        example: 'O+',
    })
    @IsString()
    bloodType: string;

    @ApiProperty({
        description: 'Gênero do usuário',
        example: 'Feminino',
    })
    @IsString()
    gender: string;

    @ApiProperty({
        description: 'url da foto de perfil do usuário',
        example: 'https://example.com/image.jpg',
    })
    @IsString()
    profilePicture: string = 'https://example.com/default-profile-picture.jpg';

    tokenVersion = 0;

    isActive = true;

    isAdmin: boolean = false;


}