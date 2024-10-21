import { useCallback, useState } from "react";
import cld from "../services/cloudinary";
import { pad } from "@cloudinary/url-gen/actions/resize";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { generativeFill } from "@cloudinary/url-gen/qualifiers/background";

const useCloudinary = () => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file) => {
    setLoading(true);
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload/`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      return await response.json();
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const transformAspectRatio = useCallback(async (public_id) => {
    let retries = 0;
    const maxRetries = 5;

    const transform = async () => {
      if (retries >= maxRetries) {
        throw new Error("Max retries exceeded");
      }

      const transformedImage = cld
        .image(public_id)
        .resize(
          pad()
            .aspectRatio("4:6")
            .gravity(compass("center"))
            .background(generativeFill())
        );

      const imageUrl = transformedImage.toURL();

      try {
        const response = await fetch(imageUrl);

        if (response.ok) {
          return imageUrl;
        }

        if (response.status === 400) {
          throw new Error(response.headers.get("x-cld-error"));
        }

        throw new Error(
          "If an error occurs, the image will proceed, please try again."
        );
      } catch (error) {
        throw new Error(error.message);
      }
    };

    while (retries < maxRetries) {
      try {
        return await transform();
      } catch (error) {
        retries++;
        if (retries >= maxRetries) {
          throw new Error(error.message);
        }
      }
    }
  }, []);

  return { uploadImage, transformAspectRatio, loading };
};

export default useCloudinary;
