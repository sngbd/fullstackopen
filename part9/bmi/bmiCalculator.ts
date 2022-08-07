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

console.log(calculateBmi(180, 74))