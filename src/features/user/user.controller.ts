import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Put,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserGetManyDto } from './dto/get-many.dto';
import { UserCreateDto } from './dto/create.dto';
import { UserUpdateDto } from './dto/update.dto';
import { AdminGuard } from 'common/guards/admin-guard';
import { exclude } from 'common/utils/field';

@Controller('/users')
@UseGuards(AdminGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getMany(@Query() params: UserGetManyDto) {
    const users = await this.userService.getMany(params);
    return users.map((user) => exclude(user, ['password']));
  }

  @Get('/:uuid')
  async getOne(@Param('uuid') uuid: string) {
    const user = await this.userService.getOne({ uuid });
    return exclude(user, ['password']);
  }

  @Post()
  create(@Body() dto: UserCreateDto) {
    return this.userService.create(dto);
  }

  @Put('/:uuid')
  update(@Param('uuid') uuid: string, @Body() dto: UserUpdateDto) {
    return this.userService.update(uuid, dto);
  }

  @Delete('/:uuid')
  delete(@Param('uuid') uuid: string) {
    return this.userService.delete(uuid);
  }
}
