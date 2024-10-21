import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @ApiOperation({ summary: 'Criando nova campanha' })
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listando todas as campanhas ativas'})
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.campaignsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listando uma campanha' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de uma campanha',
  })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizando uma campanha' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de uma campanha',
  })
  update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsService.update(id, updateCampaignDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Desativando uma campanha' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de uma campanha',
  })
  deactivate(@Param('id') id: string) {
    return this.campaignsService.deactivate(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletando uma campanha' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de uma campanha',
  })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(id);
  }
}
