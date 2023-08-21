import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CreateLoginDTO } from './dto/create-login.dto';
import { AuthService } from './auth.service';
import { RefreshDTO } from './dto/refresh.dto';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createArtistDto: CreateLoginDTO) {
    return await this.authService.createUser(createArtistDto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() createArtistDto: CreateLoginDTO) {
    return await this.authService.login(createArtistDto);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() createArtistDto: RefreshDTO) {
    return await this.authService.refresh(createArtistDto);
  }
}
