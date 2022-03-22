import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { Cat } from './cat.schema';

import { CatsService } from './cat.service';

@ApiTags('cats')
@Controller('cats')
export class AppController {
  constructor(  private readonly catsService: CatsService) {}

  @Post()
  async save(@Body() cat: Cat): Promise<Cat> {
    return await this.catsService.saveCat(cat);
  }

  @Get()
  async collection(): Promise<Cat[]> {
    return await this.catsService.collectionCats();
  }

  @Get(':id')
  @ApiParam({
    name:'id'
  })
  async searchById(@Param('id') id: string): Promise<Cat> {
    return await this.catsService.searchByIdCat(id);
  }

  @Put(':id')
  @ApiParam({
    name:'id'
  })
  async update(@Param('id') id: string, @Body() newCat: Cat): Promise<Cat | Error> {
    return await this.catsService.updateCat(id, newCat);
  }

  @Delete(':id')
  @ApiParam({
    name:'id'
  })
  async delete(@Param('id') id: string): Promise<void| Error> {
    return this.catsService.deleteCat(id)
  }
}
