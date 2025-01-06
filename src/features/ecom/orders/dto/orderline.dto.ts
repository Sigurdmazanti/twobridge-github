import { IsString, IsNumber, IsInstance, IsOptional } from 'class-validator';
import { PriceDto } from '../../shared/dto/price.dto';
import { ApiProperty } from '@nestjs/swagger';

export class OrderLineDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    id?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    productId?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    productVariantId?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    productLanguageId?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    productName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    productNumber?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    productVariantName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    productImage?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    quantity?: number;

    @ApiProperty()
    @IsOptional()
    @IsInstance(PriceDto)
    unitPrice?: PriceDto;

    @ApiProperty()
    @IsOptional()
    @IsInstance(PriceDto)
    price?: PriceDto;

    constructor(
      id?: string,
      productId?: string,
      productVariantId?: string,
      productLanguageId?: string,
      productName?: string,
      productNumber?: string,
      productVariantName?: string,
      productImage?: string,
      quantity?: number,
      unitPrice?: PriceDto,
      price?: PriceDto
    ) {
      this.id = id;
      this.productId = productId;
      this.productVariantId = productVariantId;
      this.productLanguageId = productLanguageId;
      this.productName = productName;
      this.productNumber = productNumber;
      this.productVariantName = productVariantName;
      this.productImage = productImage;
      this.quantity = quantity;
      this.unitPrice = unitPrice;
      this.price = price;
    }
}