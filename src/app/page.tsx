import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import { Button } from "@/components/ui/button";

type SearchParamProps = {
  searchParams: {
    admin?: string;
  };
};

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      {isAdmin && <PasskeyModal />}

      
        <div className="flex items-center justify-center gap-x-4 pb-4">
          <Image
            src="/logo.png"
            height={1000}
            width={1000}
            alt="logo"
            className=" h-8 w-8"
          />
          <h1 className="text-24-bold text-dark-800 ">
          Book
          </h1>
          </div>

          <PatientForm />

          <div className="text-14-regular flex justify-between">
            {/* <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePluse
            </p> */}
            
            <Link href="/?admin=true" className="pt-8">
              Admin
            </Link>
            
          
        </div>
      
    </div>
  );
};

export default Home;
