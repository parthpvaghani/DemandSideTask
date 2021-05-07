import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './note.model';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
      ],
    providers: [NoteService, NoteResolver],
})
export class NoteModule {}
