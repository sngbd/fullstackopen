import express from 'express';
import diagnoseService from './services/diagnoseService';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});