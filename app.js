import Express, { Router } from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import authenticate from './middleware/authenticate.js';
import apiRouter from './routes/api.js';

function Application({ log } = {}) {
  const app = Express();
  app.use(cors())
  app.use(morgan(log))
  app.use(Express.json())

  // Configuring API
  app.use('/api', authenticate, apiRouter);

  // Configuring Frontend
  app.get('/', (req, res) => res.redirect('/app').end());
  app.use(Express.static(path.join(path.resolve(), 'client', 'dist')));
  //app.get('/app', (req, res) => res.send('aaa'));
  app.get('/app/?*', (req, res) => res.sendFile(path.join(path.resolve(), 'client', 'dist', 'index.html')));

  return app;
}

export default Application;