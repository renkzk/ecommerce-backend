import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly image: string;
}
