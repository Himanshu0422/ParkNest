import { Address } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class AddressEntity
  implements RestrictProperties<AddressEntity, Address>
{
  address: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  lat: number;
  lng: number;
  @IsOptional()
  garageId: number;
}
