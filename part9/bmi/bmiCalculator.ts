interface BMIValues {
  value1: number;
  value2: number;
}

const parseBMIArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height_cm: number, weight: number): string => {
  const height_m = height_cm / 100;
  const bmi = weight / Math.pow(height_m, 2);

  if (bmi >= 30) {
    return 'Obese';
  }
  else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  }
  else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Normal (healthy weight)';
  }
  else {
    return 'Underweight';
  }
}

try {
  const { value1, value2 } = parseBMIArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}