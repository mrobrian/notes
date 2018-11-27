import Note from "../../common/types/note";
import * as Request from "./requestHelpers";

async function getAll(): Promise<Note[]> {
  return await Request.get('/api/notes');
}

async function get(id: number): Promise<Note> {
  return await Request.get(`/api/notes/${id}`);
}

async function create(): Promise<Note> {
  return await Request.post('/api/notes', undefined, { text: '' });
}

async function remove(id: number): Promise<void> {
  return await Request.remove(`/api/notes/${id}`);
}

async function update(id: number, text: string): Promise<Note> {
  return await Request.put(`/api/notes/${id}`, undefined, { text });
}

export {
  create,
  get,
  getAll,
  remove,
  update
}