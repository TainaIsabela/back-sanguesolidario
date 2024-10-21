import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Criando novo quiz' })
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Get('/all/:idUser')
  @ApiOperation({ summary: 'Listando todos os resultados de quizes do Usuário' })
  @ApiParam({
    name: 'idUser',
    type: 'string',
    description: 'ID válido de um usuário',
  })
  findAll(
    @Param('idUser') idUser: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.quizService.findAll(idUser, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listando resultado de um quiz' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de um quiz',
  })
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizando um quiz' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de um quiz',
  })
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletando um quiz' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de um quiz',
  })
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }
}
