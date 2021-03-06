import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '.prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Body()
    createProductDto: Prisma.ProductCreateInput & { categoryId: number },
  ) {
    // createProductDto.categoryId = +createProductDto.categoryId
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Post('getByNameAndCategory')
  getByNameAndCategory(@Body() body: { name: string; categoryId: number[] }) {
    return this.productsService.findByNameAndCategory(
      body.name,
      body.categoryId,
    );
  }

  @Post('clone')
  clone(@Body() body: { id: number }) {
    return this.productsService.clone(body.id);
  }

  @Post('getByRange')
  getByRange(@Body() body: { ids: number[] }) {
    return this.productsService.findInRange(body.ids);
  }
}
