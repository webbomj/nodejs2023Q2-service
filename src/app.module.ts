import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { DbModule } from './db/db.module';

import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ApiModule, DbModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
