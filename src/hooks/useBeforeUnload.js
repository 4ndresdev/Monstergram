import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

const useBeforeUnload = (fileSelected) => {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      fileSelected?.name && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker?.state === "blocked" && fileSelected?.name) {
      const isConfirmed = window.confirm(
        "Do you really want to leave? Your changes will be lost."
      );
      if (isConfirmed) {
        blocker.proceed();
      }
    }
  }, [blocker, fileSelected]);

  useEffect(() => {
    if (fileSelected?.name) {
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
  }, [fileSelected]);
};

export default useBeforeUnload;
