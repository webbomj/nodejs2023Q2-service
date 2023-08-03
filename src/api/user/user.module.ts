import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [DbModule],
})
export class UserModule {}
