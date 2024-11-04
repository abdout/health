// src/pages/patients/[userId]/register.tsx

import Image from "next/image";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { getPatient } from "@/lib/actions/patient";

type SearchParamProps = {
  params: {
    userId: string;
  };
};

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (!user) {
    // Handle the case where the user is not found
    // You can redirect to a 404 page or display an error message
    redirect("/404"); // Redirect to a 404 page
    // Or return an error component:
    // return <div>User not found</div>;
  }

  if (patient) {
    redirect(`/patients/${userId}/new-appointment`);
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          {/* Since we've ensured user is not null, we can safely pass it */}
          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
