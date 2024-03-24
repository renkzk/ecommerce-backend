import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Product | null> {
    return this.productService.get(id);
  }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() product: Product,
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Product> {
    return this.productService.delete(id);
  }
}
