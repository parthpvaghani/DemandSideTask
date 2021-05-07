import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
@Schema()
export class Note {

    @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String)
  @Prop()
  mainContent: string;

  @Field(() => String)
  @Prop()
  creationDate: string;

  @Field(() => [String])
  @Prop()
  tags: [string]; 
 


}

export type NoteDocument = Note & Document;

export const NoteSchema = SchemaFactory.createForClass(Note);