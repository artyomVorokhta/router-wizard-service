import { AppealStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ClientDto } from 'common/types/dto/client.dto';

export class AppealCreateDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ClientDto)
  client: ClientDto;

  @IsString()
  @IsOptional()
  status?: AppealStatus;
}
