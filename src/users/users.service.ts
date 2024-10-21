import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashService } from '../auth/hash.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const userAlreadyExists = await this.usersRepository.findOne({
      where: [
        { email: createUserDto.email },
      ],
    });
    if (userAlreadyExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    createUserDto.password = await this.hashService.hashPassword(
      createUserDto.password,
    );
    createUserDto.isActive = true;
    createUserDto.tokenVersion = 0;
    try {
      await this.usersRepository.save(createUserDto);
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
    return createUserDto;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUser(id);
    if(updateUserDto.password) {
      updateUserDto.password = await this.hashService.hashPassword(
        updateUserDto.password,
      );
    }
    try {
      await this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException('Error updating user', HttpStatus.BAD_REQUEST);
    }
    return updateUserDto;
  }

  async getUser (id: string) {
    const user = await this.usersRepository.findOne({
      where: [
        { id },
      ],
    });
    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserByEmail (email: string) {
    const user = await this.usersRepository.findOne({
      where: [
        { email: email },
      ],
    });
    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async desetivateUser (id: string) {
    const user = await this.getUser(id);
    user.isActive = false;
    await this.usersRepository.update(id, user);
  }

  async forgetPassword (email: string) {
    const user = await this.usersRepository.findOne({
      where: [
        { email },
      ],
    });
    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // gerar token númerico aleatório
    const token = Math.floor(Math.random() * 1000000);
    // enviar email com token
    user.tokenVersion = token;

    await this.usersRepository.update(user.id, user);
  }

  async resetPassword(email: string, password: string) {
    let user = await this.getUserByEmail(email);

    user.password = await this.hashService.hashPassword(password);
    
    try {  
      await this.usersRepository.update(user.id, user);
    } catch (error) {
      throw new HttpException('Error updating password', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}