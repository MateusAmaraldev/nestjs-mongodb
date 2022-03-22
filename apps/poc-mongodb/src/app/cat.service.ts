import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async saveCat(cat:Cat):Promise<Cat> {
      const response = new this.catModel(cat);
      return await response.save();
  }

  async collectionCats():Promise<Cat[]>{
      return await this.catModel.find().exec();
  }

  async searchByIdCat(id:string):Promise<Cat>{
    return await this.catModel.findById(id).exec();
  }

  async updateCat(id: string, cat: Cat): Promise<Cat | Error> {
     const updatedCat = await this.catModel.findByIdAndUpdate(id, cat).exec();

     if(!updatedCat){
      return new NotFoundException('cat not found');
     }
     return updatedCat;
  }

  async deleteCat(id: string):Promise<void | Error> {
    const deletedCat = await this.catModel.findOneAndDelete({ _id: id }).exec();

    if(!deletedCat){
     return new NotFoundException('cat not found');
    }

     deletedCat.remove();

  }
}
