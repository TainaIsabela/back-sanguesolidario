import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationsRepository: Repository<Donation>
  ) {}
  
  async create(createDonationDto: CreateDonationDto) {
    const donation = await this.donationsRepository.create(createDonationDto);
    await this.donationsRepository.save(donation);
    return new HttpException('Donation created', HttpStatus.CREATED);
  }

  async findAll(idUser: string, page: number, limit: number) {
    
    const [donations, total] = await this.donationsRepository.findAndCount({
      where: { userId: idUser },
      order: { donationDate: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: donations,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const donation = await this.donationsRepository.findOne({
      where: [
        { id },
      ],
    });
    if (!donation) {
      throw new HttpException('Donation not found', HttpStatus.NOT_FOUND);
    }
    return donation;
  }

  async update(id: string, updateDonationDto: UpdateDonationDto) {
    await this.findOne(id);
    await this.donationsRepository.update(id, updateDonationDto);
    return updateDonationDto;
  }

  async lastDonation(id: string) {
    const donation = await this.donationsRepository.find(
      {
        where: [
          { userId: id },
        ],
        order: {
          donationDate: 'DESC',
        },
        take: 1,
      }
    );
    return donation;
  }
  
  async remove(id: string) {
    await this.findOne(id);
    await this.donationsRepository.delete(id);
    return new HttpException('Donation deleted', HttpStatus.OK);
  }
}
