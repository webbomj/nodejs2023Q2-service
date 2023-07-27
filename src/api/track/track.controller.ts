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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FindOneParams } from './validator/findOneParams';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.trackService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.trackService.remove(params.id);
  }
}
