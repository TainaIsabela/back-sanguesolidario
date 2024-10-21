import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiOperation({ summary: 'Criando novo Agendamento' })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Listando todos os Agendamentos de uma data' })
  @ApiParam({
    name: 'page',
    type: 'number',
    description: 'Número da página',
  })
  @ApiParam({
    name: 'limit',
    type: 'number',
    description: 'Número de registros por página',
  })
  fimdAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.scheduleService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listando um Agendamento' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de um Agendamento',
  })
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizando um Agendamento' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de um Agendamento',
  })
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletando um Agendamento' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de um Agendamento',
  })
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }
}
