import PropTypes from "prop-types";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const FileUpload = ({ setFileSelected }) => {
  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length) {
        const { message } = fileRejections[0].errors[0];
        toast.error(message, {
          position: "bottom-right",
        });
        return;
      }

      setFileSelected(acceptedFiles[0]);
    },
    [setFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

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
