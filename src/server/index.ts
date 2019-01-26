import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as compression from 'compression';

import * as NotesService from './notesService';

let port = 8080;
if (process.argv.length > 2) {
  port = parseInt(process.argv[2]);
  if (isNaN(port)) {
    console.log('Please supply a valid port number');
    process.exit();
  }
}

const app = express();
app.use(compression());
app.use(bodyParser.json());

app.get('/api/notes', async (_: express.Request, res: express.Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(await NotesService.getAll()));
});
app.post('/api/notes', async (req: express.Request, res: express.Response) => {
  if (typeof req.body.text !== 'string') {
    return res.status(400).end('Invalid request');
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(201).end(JSON.stringify(await NotesService.create(req.body.text)));
});
app.get('/api/notes/:id', async (req: express.Request, res: express.Response) => {
  const note = await NotesService.get(req.params.id);
  if (note === null) {
    return res.status(404).end('Note not found');
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(note));
});
app.put('/api/notes/:id', async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || typeof req.body.text !== 'string') {
    return res.status(400).end('Invalid request');
  }
  try {
    const note = await NotesService.update(id, req.body.text);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(note))
  } catch (e) {
    res.status(500).end(`Internal Server Error: ${e}`);
  }
});
app.delete('/api/notes/:id', async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).end('Invalid request');
  }
  try {
    await NotesService.remove(id);
    res.status(204).end();
  } catch (e) {
    res.status(500).end(`Internal Server Error: ${e}`);
  }
});

app.use(express.static(path.resolve(__dirname, '../..', 'build')));
app.get('*', (_: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(__dirname, '../..', 'build/index.html'));
})

app.listen(port, () => {
  console.log(`Notes server running on port ${port}`);
});

process.on('SIGINT', () => {
  console.log('\nClosing server');
  process.exit();
});