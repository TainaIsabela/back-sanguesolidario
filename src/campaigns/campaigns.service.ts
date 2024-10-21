import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>
  ) {}

  async create(createCampaignDto: CreateCampaignDto) {
    createCampaignDto.isActive = true;
    const campaign = await this.campaignsRepository.create(createCampaignDto);
    await this.campaignsRepository.save(campaign);
    return campaign;
  }

  async findAll(page: number, limit: number) {
    const [campaigns, total] = await this.campaignsRepository.findAndCount({
      where: { isActive: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: campaigns,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const campaig = await this.campaignsRepository.findOne({
      where: [
        { id },
      ],
    });
    if (!campaig) {
      throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);
    }
    return campaig;
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    await this.findOne(id);
    await this.campaignsRepository.update(id, updateCampaignDto);
    return updateCampaignDto;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.campaignsRepository.delete(id);
    return new HttpException('Campaign deleted', HttpStatus.OK);
  }

  async deactivate(id: string) {
    await this.findOne(id);
    await this.campaignsRepository.update(id, { isActive: false });
    return new HttpException('Campaign deactivated', HttpStatus.OK);
  }
}
