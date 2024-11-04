// src/services/patients.service.ts

"use server";

import { db } from "@/lib/db";
import { RegisterUserParams } from "./patient-type";
import { saveFile } from "../file";
import { parseStringify } from "../utils";

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  userId,
  ...patientData
}: RegisterUserParams) => {
  try {
    let fileUrl: string | null = null;

    if (identificationDocument) {
      // Save the identification document and get its URL or path
      fileUrl = await saveFile(identificationDocument);
    }

    // Create new patient record
    const newPatient = await db.patient.create({
      data: {
        userId,
        identificationDocument: fileUrl,
        ...patientData,
      },
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
    throw error;
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is undefined or invalid");
  }

  if (userId.length !== 24) {
    throw new Error("Invalid User ID format");
  }

  try {
    const patient = await db.patient.findFirst({
      where: { userId },
    });

    return parseStringify(patient);
  } catch (error) {
    console.error(
      `An error occurred while retrieving the patient details for userId "${userId}":`,
      error
    );
    throw error;
  }
};
