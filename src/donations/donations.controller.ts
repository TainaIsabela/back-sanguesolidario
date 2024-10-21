import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  @ApiOperation({ summary: 'Criando nova doação' })
  create(@Body() createDonationDto: CreateDonationDto) {
    
    return this.donationsService.create(createDonationDto);
  }

  @Get('/all/:idUser')
  @ApiOperation({ summary: 'Listando todas as doações do Usuário' })
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
    return this.donationsService.findAll(idUser, page, limit);
  }

  @Get('last/:id')
  @ApiOperation({ summary: 'Listando a doação mais recente do usuário' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de uma doação',
  })
  lastDonation(@Param('id') id: string) {
    return this.donationsService.lastDonation(id);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Listando uma doação' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de uma doação',
  })
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizando uma doação' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de uma doação',
  })
  update(@Param('id') id: string, @Body() updateDonationDto: UpdateDonationDto) {
    return this.donationsService.update(id, updateDonationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletando uma doação' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de uma doação',
  })
  remove(@Param('id') id: string) {
    return this.donationsService.remove(id);
  }
}
