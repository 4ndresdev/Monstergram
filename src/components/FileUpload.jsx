import PropTypes from "prop-types";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import useCloudinary from "../hooks/useCloudinary";

const FileUpload = ({ setFileSelected }) => {
  const { uploadImage, loading } = useCloudinary();
  const onDrop = useCallback(
    async (acceptedFiles, fileRejections) => {
      if (fileRejections.length) {
        const { message } = fileRejections[0].errors[0];
        toast.error(message, {
          position: "bottom-right",
        });
        return;
      }
      const imageUploaded = await uploadImage(acceptedFiles[0]).catch(
        (error) => {
          toast.error(error.message);
        }
      );
      setFileSelected(imageUploaded);
    },
    [setFileSelected, uploadImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-md text-slate-500">
          Uploading the next victim... 🩸📸
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-"
      {...getRootProps({
        className:
          "dropzone min-w-full min-h-full h-40 flex items-center justify-center",
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-center line leading-relaxed text-md text-slate-500">
          🩸 The darkness is hungry... drop it here! 🔮
        </p>
      ) : (
        <p className="text-center line leading-relaxed text-md text-slate-500">
          🕯️Drop your file here, but beware... <br /> something might be lurking
          👁️, or click to select 🦇
        </p>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  setFileSelected: PropTypes.func.isRequired,
};

export default FileUpload;
