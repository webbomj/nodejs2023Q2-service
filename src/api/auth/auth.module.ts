import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { DbModule } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';

export const secret = process.env.SECRET || 'Dasdasd1asdask3jkasdmmnasdj2';

@Module({
  imports: [
    UserModule,
    DbModule,
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
