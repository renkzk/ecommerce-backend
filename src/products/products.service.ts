import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async get(id: number): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async create(body: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data: body });
  }

  async update(id: number, body: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
