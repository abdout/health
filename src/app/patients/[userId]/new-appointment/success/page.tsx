// src/app/patients/[userId]/request-success/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";

type RequestSuccessProps = {
  params: {
    userId: string;
  };
  searchParams: {
    appointmentId?: string;
    [key: string]: string | string[] | undefined;
  };
};

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: RequestSuccessProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  // Handle the case where the appointment is not found
  if (!appointment) {
    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <div className="success-img">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="h-10 w-fit"
            />
          </Link>
          <section className="flex flex-col items-center">
            <Image
              src="/assets/gifs/error.gif"
              height={300}
              width={280}
              alt="error"
            />
            <h2 className="header mb-6 max-w-[600px] text-center">
              Appointment not found.
            </h2>
            <p>Please check the appointment ID or contact support.</p>
          </section>
        </div>
      </div>
    );
  }

  // Find the doctor based on the appointment's primary physician
  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            {doctor && doctor.image && (
              <Image
                src={doctor.image}
                alt="doctor"
                width={100}
                height={100}
                className="size-6"
              />
            )}
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>
              {formatDateTime(appointment.schedule).dateTime}
            </p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 CarePulse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;