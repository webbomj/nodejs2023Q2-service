import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ApiModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
