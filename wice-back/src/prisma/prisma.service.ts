import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaClient } from '@prisma/client';
@Injectable()

export class PrismaService extends PrismaClient {
  constructor(ConfigService: ConfigService) {
    super({
      datasources: {
        db: {
          url: ConfigService.get('DATABASE_URL'),
        },
      },
    });
  }
}
