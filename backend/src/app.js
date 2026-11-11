import express from 'express';
import livrosRouter from './routes/livros.js';
import playlistsRouter from './routes/playlists.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({
    api: 'Livros e Playlists API',
    versao: '1.0.0',
    rotas: ['/livros', '/playlists'],
  });
});

app.use('/livros', livrosRouter);
app.use('/playlists', playlistsRouter);

app.use((req, res) => {
  res.status(404).json({ erro: `Rota ${req.method} ${req.url} não existe` });
});

app.use(errorHandler);

export default app;
