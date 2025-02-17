import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AllowAuthenticated } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateVerificationInput } from './dtos/create-verification.input';
import {
  FindManyVerificationArgs,
  FindUniqueVerificationArgs,
} from './dtos/find.args';
import { UpdateVerificationInput } from './dtos/update-verification.input';
import { Verification } from './entity/verification.entity';
import { VerificationsService } from './verifications.service';

@Resolver(() => Verification)
export class VerificationsResolver {
  constructor(
    private readonly verificationsService: VerificationsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('admin')
  @Mutation(() => Verification)
  createVerification(
    @Args('createVerificationInput') args: CreateVerificationInput,
  ) {
    return this.verificationsService.create(args);
  }

  @Query(() => [Verification], { name: 'verifications' })
  findAll(@Args() args: FindManyVerificationArgs) {
    return this.verificationsService.findAll(args);
  }

  @Query(() => Verification, { name: 'verification' })
  findOne(@Args() args: FindUniqueVerificationArgs) {
    return this.verificationsService.findOne(args);
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Verification)
  async updateVerification(
    @Args('updateVerificationInput') args: UpdateVerificationInput,
  ) {
    return this.verificationsService.update(args);
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Verification)
  async removeVerification(@Args() args: FindUniqueVerificationArgs) {
    return this.verificationsService.remove(args);
  }
}
