interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));