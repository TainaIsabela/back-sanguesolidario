import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @ApiProperty({ description: 'ID do usuário' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Email do usuário, um dos indentificadores do usuário',
    })
    @Column()
    email: string;

    @ApiProperty({ description: 'Nome do usuário' })
    @Column()
    name: string;

    @ApiProperty({ description: 'Senha do usuário' })
    @Column()
    password: string;

    @ApiProperty({ description: 'Tipo Sanguíneo do usuário' })
    @Column()
    bloodType: string;

    @ApiProperty({ description: 'Gênero do usuário' })
    @Column()
    gender: string;

    @ApiProperty({ description: 'Versão do toke do usuário' })
    @Column()
    tokenVersion: number;

    @ApiProperty({ description: 'Foto de perfil do usuário' })
    @Column({ default: null })
    profilePicture: string;

    @ApiProperty({ description: 'Status de atividade do usuário' })
    @Column()
    isActive: boolean;

    @ApiProperty({ description: 'Administrador ou não' })
    @Column({ default: false })
    isAdmin: boolean;

}

export const userEntity = {
    id: 'Id',
    email: 'email',
    name: 'name',
    password: 'password',
    bloodType: 'bloodType',
    gender: 'gender',
    tokenVersion: 'tokenVersion',
    isActive: 'isActive',
    isAdmin: 'isAdmin',
};

