import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
  @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}
  
  async create(createQuizDto: CreateQuizDto) {
    await this.quizRepository.save(createQuizDto);
    return createQuizDto;
  }

  async findAll(idUser: string, page: number, limit: number) {
    const [quizzes, total] = await this.quizRepository.findAndCount({
      where: { userId: idUser },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: quizzes,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const resultQuiz = await this.quizRepository.findOne({
      where: [
        { id },
      ],
    });
    if (!resultQuiz) {
      throw new HttpException('Result quiz not found', HttpStatus.NOT_FOUND);
    }
    return resultQuiz;
  }
  
  async update(id: string, updateQuizDto: UpdateQuizDto) {
    const resultQuiz = await this.findOne(id);
    await this.quizRepository.update(id, updateQuizDto);
    return updateQuizDto;
  }

  async remove(id: string) {
    const resultQuiz = await this.findOne(id);
    await this.quizRepository.delete(id);
  }
}
