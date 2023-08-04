import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FAVORITES_ID } from 'src/api/favs/constant/constants';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    const favorites = await this.favorite.findUnique({
      where: { id: FAVORITES_ID },
    });

    if (!favorites) {
      await this.favorite.create({
        data: {
          albums: [],
          artists: [],
          tracks: [],
        },
      });
    }
  }
}
