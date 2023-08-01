import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { UseInterceptors } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneParams } from './validator/findOneParams';
import { UserEntity } from './serializer/userEntity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    return new UserEntity(this.userService.create(createUserDto));
  }

  @Get()
  findAll() {
    return this.userService.findAll().map((user) => new UserEntity(user));
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): UserEntity {
    return new UserEntity(this.userService.findOne(params.id));
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateUserDto: UpdateUserDto,
  ): UserEntity {
    return new UserEntity(this.userService.update(params.id, updateUserDto));
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.userService.remove(params.id);
  }
}
