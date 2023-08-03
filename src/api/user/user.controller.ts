import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpException,
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
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.create(createUserDto);
    return new UserEntity(user);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    try {
      const user = await this.userService.findAll();
      const returnUser = user.map((user) => new UserEntity(user));
      return returnUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams): Promise<UserEntity> {
    const user = await this.userService.findOne(params.id);
    return new UserEntity(user);
  }

  @Put(':id')
  async update(
    @Param() params: FindOneParams,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userService.update(params.id, updateUserDto);
    return new UserEntity(user);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    try {
      return this.userService.remove(params.id);
    } catch (error) {
      throw new HttpException('User not exist', 404);
    }
  }
}
