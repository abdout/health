// src/services/appointments.service.ts

"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Appointment, Status, Prisma } from "@prisma/client";
import { formatDateTime } from "../utils";
import { AppointmentWithPatient } from "./patient-type";
import { sendEmailNotification } from "@/lib/mail";

type AppointmentCounts = {
  totalCount: number;
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  documents: AppointmentWithPatient[];
};

export const createAppointment = async (
  appointmentData: Prisma.AppointmentUncheckedCreateInput
): Promise<Appointment | null> => {
  try {
    const newAppointment = await db.appointment.create({
      data: {
        ...appointmentData,
        note: appointmentData.note || "",
      },
    });

    revalidatePath("/admin");
    return newAppointment;
  } catch (error) {
    console.error("Error creating appointment:", error);
    return null;
  }
};

export const getRecentAppointmentList = async (): Promise<AppointmentCounts> => {
  try {
    const appointments: AppointmentWithPatient[] = await db.appointment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        patient: true, 
      },
    });

    const counts = appointments.reduce(
      (
        acc: {
          scheduledCount: number;
          pendingCount: number;
          cancelledCount: number;
        },
        appointment
      ) => {
        switch (appointment.status) {
          case Status.scheduled:
            acc.scheduledCount++;
            break;
          case Status.pending:
            acc.pendingCount++;
            break;
          case Status.cancelled:
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      {
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
      }
    );

    return {
      totalCount: appointments.length,
      ...counts,
      documents: appointments,
    };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return {
      totalCount: 0,
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      documents: [],
    };
  }
};

type UpdateAppointmentInput = {
  appointmentId: string;
  timeZone: string;
  appointment: Prisma.AppointmentUpdateInput;
  type: "schedule" | "cancel";
};

export const updateAppointment = async ({
  appointmentId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentInput): Promise<Appointment | null> => {
  try {
    const updatedAppointment = await db.appointment.update({
      where: { id: appointmentId },
      data: {
        ...appointment,
        note: appointment.note || "",
      },
    });

    if (!updatedAppointment) {
      throw new Error("Failed to update appointment");
    }

    const formattedDateTime = formatDateTime(
      updatedAppointment.schedule,
      timeZone
    ).dateTime;

    const patient = await db.patient.findUnique({
      where: { id: updatedAppointment.patientId },
    });

    if (patient?.email) {
      const emailSubject = type === "schedule" 
        ? "Appointment Scheduled" 
        : "Appointment Cancelled";
      const emailMessage =
        type === "schedule"
          ? `Greetings from CarePulse. Your appointment is confirmed for ${formattedDateTime} with Dr. ${updatedAppointment.primaryPhysician}.`
          : `We regret to inform you that your appointment scheduled for ${formattedDateTime} has been cancelled. Reason: ${updatedAppointment.cancellationReason}.`;

      await sendEmailNotification(patient.email, emailSubject, emailMessage);
    }

    revalidatePath("/admin");
    return updatedAppointment;
  } catch (error) {
    console.error("Error updating appointment:", error);
    return null;
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    return await db.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: true,
        user: true,
      },
    });
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return null;
  }
};
