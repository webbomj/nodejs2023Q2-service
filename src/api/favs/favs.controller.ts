import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FindOneParams } from './validator/findOneParams';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/track/:id')
  @HttpCode(201)
  createTrack(@Param() params: FindOneParams) {
    return this.favsService.addTrack(params.id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param() params: FindOneParams) {
    return this.favsService.removeTrack(params.id);
  }

  @Post('/album/:id')
  @HttpCode(201)
  createAlbum(@Param() params: FindOneParams) {
    return this.favsService.addAlbum(params.id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param() params: FindOneParams) {
    return this.favsService.removeAlbum(params.id);
  }

  @Post('/artist/:id')
  @HttpCode(201)
  createArtist(@Param() params: FindOneParams) {
    return this.favsService.addArtist(params.id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param() params: FindOneParams) {
    return this.favsService.removeArtist(params.id);
  }
}
