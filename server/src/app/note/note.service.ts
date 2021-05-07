
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Note, NoteDocument } from './note.model';
import {
  CreateNoteInput,
  ListNoteInput,
} from './note.inputs';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
  ) {}

  create(payload: CreateNoteInput) {
    const createdNote = new this.noteModel(payload);
    return createdNote.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.noteModel.findById(_id).exec();
  }

  list(filters: ListNoteInput) {
    return this.noteModel.find({ ...filters }).exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.noteModel.findByIdAndDelete(_id).exec();
  }
}