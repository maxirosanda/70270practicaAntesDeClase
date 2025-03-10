import { Controller, Get, Post, Body, Patch, Param, Delete,HttpException,HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    if(!createProductDto.name || !createProductDto.description || !createProductDto.price || !createProductDto.stock) {
      throw new HttpException('Incomplete values', HttpStatus.BAD_REQUEST);
    }
    const product =  this.productsService.create(createProductDto);
    return {status: 'success', data: product};
  }

  @Get()
  findAll() {
    const products = this.productsService.findAll();
    return {status: 'success', data: products};
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
