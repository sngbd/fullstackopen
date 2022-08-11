import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!weight || !height) {
    res.status(400).json({
      error: "malformatted parameters"
    });
  }
  else {
    res.json({
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  
  if (!daily_exercises || !target) {
    res.status(400).json({
      error: "parameters missing"
    });
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  else if (isNaN(Number(target)) || daily_exercises.some(isNaN)) {
    res.status(400).json({
      error: "malformatted parameters"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  else res.json(calculateExercises(target, daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});