import { useState } from "react";
import FileUpload from "../components/FileUpload";
import { ArrowLeft } from "lucide-react";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

const Generate = () => {
  const navigate = useNavigate();
  const [fileSelected, setFileSelected] = useState({});
  console.log(fileSelected);

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-12">
      <div className="left w-full col-span-12 md:col-span-4 p-5">
        <Button
          isIconOnly
          color="danger"
          variant="shadow"
          aria-label="Back to home"
          onClick={handleBack}
        >
          <ArrowLeft />
        </Button>
      </div>
      <div className="inset-0 h-full w-full flex justify-center items-center right col-span-12 md:col-span-8 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <FileUpload setFileSelected={setFileSelected} />
      </div>
    </div>
  );
};

export default Generate;
