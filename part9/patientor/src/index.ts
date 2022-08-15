/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import cors from 'cors';
import diagnoseService from './services/diagnoseService';
import patientService from './services/patientService';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

app.get('/api/patients', (_req, res) => {
  res.send(patientService.getPatients());
});

app.post('/api/patients', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientService.addPatient(
    name, 
    dateOfBirth, 
    ssn, 
    gender, 
    occupation 
  );
  res.json(newPatientEntry);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});