interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesValues {
  value1: number;
  value2: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExercisesValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const days = args.slice(3).map(arg => Number(arg));
  const notNumberExists = !days.filter(day => isNaN(day)).length;

  if (!isNaN(Number(args[2])) && notNumberExists) {
    return {
      value1: Number(args[2]),
      value2: days
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateExercises = (target: number, hours: Array<number>): Result => {
  const sum = hours.reduce((a, b) => a + b, 0);
  const zero = hours.filter(h => h === 0).length;
  const length = hours.length;
  const avg = (sum / length) || 0;
  const half = target / 2;

  let rating;
  let ratingDescription;
  let success;

  if (target > avg) {
    success = false;
    if (avg < half) {
      rating = 1;
      ratingDescription = 'that\'s really bad';
    }
    else {
      rating = 2;
      ratingDescription = 'not too bad but could be better';
    }
  }
  else {
    success = true;
    rating = 3;
    ratingDescription = 'that\'s really good';
  }
  
  return {
    periodLength: length,
    trainingDays: length - zero,
    success: success,
    rating: rating ,
    ratingDescription: ratingDescription,
    target: target,
    average: avg
  }
}

try {
  const { value1, value2 } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}