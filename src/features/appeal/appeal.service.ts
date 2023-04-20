import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from 'common/services/prisma.service';

import { AppealGetOneDto } from './dto/get-one.dto';
import { AppealCreateDto } from './dto/create.dto';
import { AppealUpdateDto } from './dto/update.dto';
import { AppealGetManyDto } from './dto/get-many.dto';

@Injectable()
export class AppealService {
  constructor(private prisma: PrismaService) {}

  async getMany({ skip, take, match }: AppealGetManyDto) {
    return this.prisma.appeal.findMany({
      skip,
      take,
      where: {
        client: {
          name: {
            contains: match,
          },
        },
      },
    });
  }

  async getOne({ uuid }: AppealGetOneDto) {
    return this.prisma.appeal.findUnique({
      where: { uuid },
    });
  }

  async create({ client, status }: AppealCreateDto) {
    return this.prisma.appeal.create({
      data: { client: { create: client }, status },
    });
  }

  async update(uuid: string, { client, status }: AppealUpdateDto) {
    const appeal = await this.getOne({ uuid });

    if (!appeal) {
      throw new NotFoundException('Appeal not found');
    }

    return this.prisma.appeal.update({
      where: { uuid },
      data: {
        client: {
          update: client,
        },
        status,
      },
    });
  }

  async delete(uuid: string) {
    const appeal = await this.getOne({ uuid });

    if (!appeal) {
      throw new NotFoundException('Appeal not found');
    }

    return this.prisma.appeal.delete({ where: { uuid } });
  }
}
