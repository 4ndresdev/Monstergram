import { useEffect } from "react";

const useBeforeUnload = (fileSelected) => {
  const isFileSelected = Object.keys(fileSelected).length ? fileSelected : null;

  useEffect(() => {
    if (isFileSelected) {
      const handleBeforeUnload = (e) => {
        const confirmationMessage =
          "If you reload the page, your current progress will be lost. Are you sure?";
        e.preventDefault();
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [isFileSelected]);
};

export default useBeforeUnload;
