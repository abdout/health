// src/types.ts

import { Prisma, Gender } from "@prisma/client";

// Parameters for creating a user
export type CreateUserParams = {
  name: string;
  email: string;
  password?: string;
  phone?: string; // Added phone as optional
};

// Parameters for registering a patient
export type RegisterUserParams = {
  identificationDocument?: File | null; // Use global File type
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string | null;
  currentMedication?: string | null;
  familyMedicalHistory?: string | null;
  pastMedicalHistory?: string | null;
  identificationType?: string | null;
  identificationNumber?: string | null;
  privacyConsent: boolean;
};

// Define AppointmentWithPatient type
export type AppointmentWithPatient = Prisma.AppointmentGetPayload<{
  include: { patient: true };
}>;
