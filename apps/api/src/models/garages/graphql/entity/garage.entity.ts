import { Field, ObjectType } from '@nestjs/graphql';
import { Garage as GarageType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Garage implements RestrictProperties<Garage, GarageType> {
  @Field({ nullable: true })
  description: string;
  createdAt: Date;
  updatedAt: Date;
  @Field({ nullable: true })
  displayName: string;
  companyId: number;
  id: number;
  images: string[];
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
