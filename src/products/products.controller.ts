import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductResponseEntity } from './entities/product.entity';
import { plainToClass } from 'class-transformer';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // About "@Api"
  // @Api is a decorator from "@nestjs/swagger" library,
  // it allows us to customize the response for an endpoint so that we can see it in Swagger UI Documentation

  // About "ParseIntPipe"
  // ParseIntPipe automatically converts the incoming parameter to an integer type

  // About "plainToClass"
  // its a function from the "class-transformer" library and it returns an instance of the specified class

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ type: [ProductResponseEntity] })
  async getAll(): Promise<ProductResponseEntity[]> {
    const products = await this.productsService.getAll();
    return products.map((product) => plainToClass(ProductResponseEntity, product));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiOkResponse({ type: ProductResponseEntity })
  async get(@Param('id', ParseIntPipe) id: number): Promise<ProductResponseEntity> {
    const product = this.productsService.get(id);
    return plainToClass(ProductResponseEntity, product);
  }

  @Post()
  @ApiOperation({ summary: 'Create a single product' })
  @ApiCreatedResponse({ type: ProductResponseEntity })
  async create(@Body() body: CreateProductDto): Promise<ProductResponseEntity> {
    const product = this.productsService.create(body);
    return plainToClass(ProductResponseEntity, product);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a single product' })
  @ApiOkResponse({ type: ProductResponseEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto): Promise<ProductResponseEntity> {
    const product = await this.productsService.update(id, body);
    return plainToClass(ProductResponseEntity, product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single product' })
  @ApiOkResponse({ type: ProductResponseEntity })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ProductResponseEntity> {
    return this.productsService.delete(id);
  }
}
