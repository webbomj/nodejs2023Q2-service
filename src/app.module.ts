import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { DbModule } from './db/db.module';

import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [ApiModule, DbModule, ConfigModule.forRoot(), LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
