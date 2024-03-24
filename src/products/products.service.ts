import { PrismaService } from 'src/prisma.service';
import { Product } from './products.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async get(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async create(product: Product): Promise<Product> {
    return this.prisma.product.create({ data: product });
  }

  async update(id: number, product: Product): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: product,
    });
  }

  async delete(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
