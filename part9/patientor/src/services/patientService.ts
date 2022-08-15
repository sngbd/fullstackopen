import patientData from '../../data/patients.json';
import { Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PublicPatient[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (
    name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string
  ): Patient => {

  const id = uuid();
  
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient
};