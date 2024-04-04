import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  //  Method that connects to the database when the module is initialized using await this.$connect().
  async onModuleInit() {
    await this.$connect();
  }
}
