import * as express from 'express';
import * as path from 'path';

let port = 8080;
if (process.argv.length > 2) {
  port = parseInt(process.argv[2]);
  if (isNaN(port)) {
    console.log('Please supply a valid port number');
    process.exit();
  }
}

const app = express();

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
})