import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

// This class is used to transform the product data in the response.
// Must be used with the "plainToClass" function.
// Example of use: "plainToClass(ProductResponseEntity, user);"

export class ProductResponseEntity {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly rating: number;

  @ApiProperty()
  readonly sale: boolean;

  @Exclude()
  readonly createdAt: Date;

  @Exclude()
  readonly updatedAt: Date;
}
