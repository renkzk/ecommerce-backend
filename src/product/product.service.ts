import { PrismaService } from 'src/prisma.service';
import { Product } from './product.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProduct(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async createProduct(product: Product): Promise<Product> {
    return this.prisma.product.create({ data: product });
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: product,
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
