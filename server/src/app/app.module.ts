import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { NoteModule } from './note/note.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://parthvaghani:parth1414@cluster0.bbzjb.mongodb.net/demandSideDB?retryWrites=true&w=majority'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
    }),
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
