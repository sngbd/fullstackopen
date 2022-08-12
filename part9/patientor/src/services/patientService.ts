import patientData from '../../data/patients.json';
import { PublicPatient } from '../types';

const getPatients = (): PublicPatient[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients
};