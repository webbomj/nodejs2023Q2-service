import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FindOneParams } from './validator/findOneParams';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams) {
    return await this.artistService.findOne(params.id);
  }

  @Put(':id')
  async update(
    @Param() params: FindOneParams,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return await this.artistService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: FindOneParams) {
    return await this.artistService.remove(params.id);
  }
}
