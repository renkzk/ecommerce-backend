import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.get(Number(id));
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productsService.update(Number(id), product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return this.productsService.delete(Number(id));
  }
}
