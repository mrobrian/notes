import * as fs from 'fs';

import Note from '../common/types/note';

let notes: Note[] | null = null;

async function getAll(): Promise<Note[]> {
  if (notes === null) {
    notes = await loadOrCreateNotes();
  }
  return notes;
}

async function get(id: number): Promise<Note | null> {
  if (notes === null) {
    notes = await loadOrCreateNotes();
  }
  return notes.find((note: Note) => note.id === id) || null;
}

async function create(text: string): Promise<Note> {
  if (notes === null) {
    notes = await loadOrCreateNotes();
  }

  const date = (new Date()).toISOString();
  const note: Note = {
    id: Math.max(...(notes.map((note: Note) => note.id!)), 0) + 1,
    created: date,
    updated: date,
    text
  }
  notes.push(note);
  await writeNotes();
  return note;
}

async function update(id: number, text: string): Promise<Note> {
  const date = (new Date()).toISOString();
  if (notes === null) {
    notes = await loadOrCreateNotes();
  }

  const currentNote = notes.find((note: Note) => note.id === id);
  if (!currentNote) {
    throw new Error('Note not found');
  }
  currentNote.text = text;
  currentNote.updated = date;
  await writeNotes();
  return currentNote;
}

async function remove(id: number): Promise<void> {
  if (notes === null) {
    notes = await loadOrCreateNotes();
  }

  const index = notes.findIndex((note: Note) => note.id === id);
  if (index === -1) {
    throw new Error(`Could not fine note with id ${id}`);
  }
  notes.splice(index, 1);
  await writeNotes();
}

async function loadOrCreateNotes(): Promise<Note[]> {
  if (fs.existsSync('./notes.json')) {
    return new Promise<Note[]>((resolve: (notes: Note[]) => void, reject: (reason: NodeJS.ErrnoException) => void) => {
      fs.readFile('./notes.json', 'utf8', (err: NodeJS.ErrnoException, data: string) => {
        if (err) {
          reject(err);
        }
        const file = JSON.parse(data);
        resolve(file.notes);
      })
    });
  }
  notes = [];
  await writeNotes();
  return notes;
}

async function writeNotes(): Promise<void> {
  return new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) => {
    fs.writeFile('./notes.json', JSON.stringify({ notes }, null, 2), (err: NodeJS.ErrnoException) => {
      if (err) {
        reject(err);
      }
      resolve();
    })
  });
}

export {
  getAll,
  get,
  create,
  update,
  remove
};
