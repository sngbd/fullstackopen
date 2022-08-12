import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoseData;
};

export default {
  getDiagnoses
};