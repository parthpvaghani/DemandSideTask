
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Note } from './note.model';
import { NoteService } from './note.service';
import {
  CreateNoteInput,
  ListNoteInput,
} from './note.inputs';

@Resolver(() => Note)
export class NoteResolver {
  constructor(private noteService: NoteService) {}

  @Query(() => Note)
  async note(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.noteService.getById(_id);
  }

  @Query(() => [Note])
  async notes(
    @Args('filters', { nullable: true }) filters?: ListNoteInput) {
    return this.noteService.list(filters);
  }

  @Mutation(() => Note)
  async createNote(@Args('payload') payload: CreateNoteInput) {
    return this.noteService.create(payload);
  }

  @Mutation(() => Note)
  async deleteNote(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.noteService.delete(_id);
  }
}