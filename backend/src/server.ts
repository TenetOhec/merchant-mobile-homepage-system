import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ensureConfigFile, getConfig, resetConfig, saveConfig } from './configService.js';
import type { HomeConfig } from './types.js';

const app = express();
const port = Number(process.env.PORT || 4000);
const host = process.env.HOST || '127.0.0.1';

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.get('/api/config', async (_req, res, next) => {
  try {
    const config = await getConfig();
    res.json(config);
  } catch (error) {
    next(error);
  }
});

app.put('/api/config', async (req, res, next) => {
  try {
    const payload = req.body as HomeConfig;
    const config = await saveConfig(payload);
    res.json(config);
  } catch (error) {
    next(error);
  }
});

app.post('/api/config/reset', async (_req, res, next) => {
  try {
    const config = await resetConfig();
    res.json(config);
  } catch (error) {
    next(error);
  }
});

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500).json({
    message: error.message || 'Server error'
  });
});

ensureConfigFile()
  .then(() => {
    app.listen(port, host, () => {
      console.log(`Backend server listening on http://${host}:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize config file', error);
    process.exit(1);
  });
