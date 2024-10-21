import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import PreviewPost from "../components/PreviewPost";
import useBeforeUnload from "../hooks/useBeforeUnload";
import useCloudinary from "../hooks/useCloudinary";
import toast from "react-hot-toast";

const Generate = () => {
  const navigate = useNavigate();
  const [fileSelected, setFileSelected] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { transformAspectRatio } = useCloudinary();
  useBeforeUnload(fileSelected);

  const handleBack = () => {
    navigate("/home");
  };

  const handleReset = () => {
    setFileSelected({});
    setPreviewImage(null);
  };

  useEffect(() => {
    const processImage = async () => {
      if (!fileSelected?.public_id) return;

      try {
        setProcessing(true);
        setPreviewImage(fileSelected.secure_url);

        const secure_url = await transformAspectRatio(fileSelected.public_id);
        setPreviewImage(secure_url);
      } catch (error) {
        toast.error(error.message);
        setPreviewImage(null);
        setFileSelected({});
      } finally {
        setProcessing(false);
      }
    };

    processImage();
  }, [fileSelected, transformAspectRatio]);

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
        {previewImage ? (
          <PreviewPost
            previewImage={previewImage}
            processing={processing}
            handleReset={handleReset}
          />
        ) : (
          <FileUpload setFileSelected={setFileSelected} />
        )}
      </div>
    </div>
  );
};

export default Generate;
