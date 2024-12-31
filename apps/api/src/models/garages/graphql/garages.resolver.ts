import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetUserType } from 'src/common/types';
import { CreateGarageInput } from './dtos/create-garage.input';
import { FindManyGarageArgs, FindUniqueGarageArgs } from './dtos/find.args';
import { UpdateGarageInput } from './dtos/update-garage.input';
import { Garage } from './entity/garage.entity';
import { GaragesService } from './garages.service';
@Resolver(() => Garage)
export class GaragesResolver {
  constructor(
    private readonly garagesService: GaragesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('manager')
  @Mutation(() => Garage)
  createGarage(@Args('createGarageInput') args: CreateGarageInput) {
    return this.garagesService.create(args);
  }

  @Query(() => [Garage], { name: 'garages' })
  findAll(@Args() args: FindManyGarageArgs) {
    return this.garagesService.findAll(args);
  }

  @Query(() => Garage, { name: 'garage' })
  findOne(@Args() args: FindUniqueGarageArgs) {
    return this.garagesService.findOne(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Garage)
  async updateGarage(
    @Args('updateGarageInput') args: UpdateGarageInput,
    @GetUser() user: GetUserType,
  ) {
    const garage = await this.prisma.garage.findUnique({
      where: { id: args.id },
      include: { Company: { include: { Managers: true } } },
    });
    checkRowLevelPermission(
      user,
      garage.Company.Managers.map((man) => man.uid),
    );
    return this.garagesService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Garage)
  async removeGarage(
    @Args() args: FindUniqueGarageArgs,
    @GetUser() user: GetUserType,
  ) {
    const garage = await this.prisma.garage.findUnique({
      where: { id: args.where.id },
      include: { Company: { include: { Managers: true } } },
    });
    checkRowLevelPermission(
      user,
      garage.Company.Managers.map((man) => man.uid),
    );
    return this.garagesService.remove(args);
  }
}
