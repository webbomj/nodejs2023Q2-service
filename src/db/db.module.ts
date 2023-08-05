import { Module } from '@nestjs/common';
import { DbService } from './db/db.service';
import { PrismaService } from './db/prisma.service';

@Module({
  providers: [DbService, PrismaService],
  exports: [DbService, PrismaService],
})
export class DbModule {}
