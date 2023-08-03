import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FindOneParams } from './validator/findOneParams';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post('/track/:id')
  @HttpCode(201)
  async createTrack(@Param() params: FindOneParams) {
    return await this.favsService.addTrack(params.id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async removeTrack(@Param() params: FindOneParams) {
    return await this.favsService.removeTrack(params.id);
  }

  @Post('/album/:id')
  @HttpCode(201)
  async createAlbum(@Param() params: FindOneParams) {
    return await this.favsService.addAlbum(params.id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async removeAlbum(@Param() params: FindOneParams) {
    return await this.favsService.removeAlbum(params.id);
  }

  @Post('/artist/:id')
  @HttpCode(201)
  async createArtist(@Param() params: FindOneParams) {
    return await this.favsService.addArtist(params.id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async removeArtist(@Param() params: FindOneParams) {
    return await this.favsService.removeArtist(params.id);
  }
}
