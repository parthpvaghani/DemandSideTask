import { Schema as MongooseSchema } from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';


@InputType()
export class CreateNoteInput {
    @Field(() => String)
  mainContent: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  creationDate: string;

  @Field(() => [String])
  tags:[string];
}

@InputType()
export class ListNoteInput {
    @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  title?: string;
}
