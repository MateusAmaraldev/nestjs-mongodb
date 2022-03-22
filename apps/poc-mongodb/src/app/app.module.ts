import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { CatsService } from './cat.service';
import {Cat,CatSchema} from './cat.schema';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://pocmongodbuser:${process.env.MONGODB_PASSWORD}@cluster0.o6jrj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`),

MongooseModule.forFeature([
  {
    name: Cat.name,
    schema:CatSchema
  }
])
],
  controllers: [AppController],
  providers: [CatsService],
})
export class AppModule {}
