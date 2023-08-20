import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { DbModule } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';

const secret = process.env.SECRET || 'asdsad28sadtasd566asd65sad';

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
  providers: [AuthService, UserService],
})
export class AuthModule {}
