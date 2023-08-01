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
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.artistService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return this.artistService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.artistService.remove(params.id);
  }
}
