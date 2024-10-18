import { Button } from "@nextui-org/button";
import Lottie from "lottie-react";
import { ArrowLeft } from "lucide-react";
import zombies from "../assets/lotties/zombie.json";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center lg:flex-row flex-col gap-2">
      <Lottie animationData={zombies} loop={true} style={{ width: 300 }} />
      <div className="flex flex-col lg:items-start gap-4 m-10 text-white">
        <div className="flex gap-x-1">
          <p className="text-lg font-normal underline underline-offset-8">
            Error
          </p>
          <p className="text-lg font-normal">404</p>
        </div>
        <h1 className="lg:text-6xl text-5xl font-bold lg:text-start">
          This page is haunted!
        </h1>
        <p className="text-lg font-normal">But you can escape... 🎃</p>
        <Button
          variant="outline"
          className="flex items-center gap-1 dark:bg-gray-800"
          onClick={goHome}
        >
          <ArrowLeft size={17} />
          Back to safety
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
