import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetUserType } from 'src/common/types';
import { User } from 'src/models/users/graphql/entity/user.entity';
import { Verification } from 'src/models/verifications/graphql/entity/verification.entity';
import { AdminsService } from './admins.service';
import { CreateAdminInput } from './dtos/create-admin.input';
import { FindManyAdminArgs, FindUniqueAdminArgs } from './dtos/find.args';
import { UpdateAdminInput } from './dtos/update-admin.input';
import { Admin } from './entity/admin.entity';

@Resolver(() => Admin)
export class AdminsResolver {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('admin')
  @Mutation(() => Admin)
  createAdmin(
    @Args('createAdminInput') args: CreateAdminInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid);
    return this.adminsService.create(args);
  }

  @AllowAuthenticated('admin')
  @Query(() => [Admin], { name: 'admins' })
  findAll(@Args() args: FindManyAdminArgs) {
    return this.adminsService.findAll(args);
  }

  @AllowAuthenticated('admin')
  @Query(() => Admin, { name: 'admin' })
  findOne(@Args() args: FindUniqueAdminArgs) {
    return this.adminsService.findOne(args);
  }

  @AllowAuthenticated()
  @Query(() => Admin, { name: 'adminMe' })
  adminMe(@GetUser() user: GetUserType) {
    return this.adminsService.findOne({ where: { uid: user.uid } });
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Admin)
  async updateAdmin(
    @Args('updateAdminInput') args: UpdateAdminInput,
    @GetUser() user: GetUserType,
  ) {
    const admin = await this.prisma.admin.findUnique({
      where: { uid: args.uid },
    });
    checkRowLevelPermission(user, admin.uid);
    return this.adminsService.update(args);
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Admin)
  async removeAdmin(
    @Args() args: FindUniqueAdminArgs,
    @GetUser() user: GetUserType,
  ) {
    const admin = await this.prisma.admin.findUnique(args);
    checkRowLevelPermission(user, admin.uid);
    return this.adminsService.remove(args);
  }

  @ResolveField(() => User, { nullable: true })
  user(@Parent() admin: Admin) {
    return this.prisma.user.findUnique({ where: { uid: admin.uid } });
  }
  @ResolveField(() => [Verification])
  verifications(@Parent() parent: Admin) {
    return this.prisma.verification.findMany({
      where: { adminId: parent.uid },
    });
  }
  @ResolveField(() => Number)
  async verificationsCount(@Parent() parent: Admin) {
    return this.prisma.verification.count({
      where: { adminId: parent.uid },
    });
  }
}
