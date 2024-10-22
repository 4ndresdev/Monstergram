import { useContext } from "react";
import PropTypes from "prop-types";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import { AuthContext } from "../context/AuthContext";
import { emailFormatter, displayNameFormatter } from "../utils/string.format";
import { X } from "lucide-react";

const PreviewPost = ({
  previewImage,
  processing,
  handleReset,
  handleSubmit,
  postButtonRef,
  loading,
  wasGenerated,
}) => {
  const { user } = useContext(AuthContext);
  const { email, displayName, photoURL } = user;
  const diableCreatePost = !wasGenerated;

  return (
    <div className="w-full h-full flex justify-center items-center p-5">
      <div>
        <h1 className="mb-5 text-md text-slate-500">
          {processing ? "Proccesing photo..." : "Preview post"}
        </h1>
        <div className="relative">
          <div className="header w-full absolute z-20 px-5 mt-5 text-white flex justify-between items-center">
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: photoURL,
                size: "sm",
                radius: "sm",
                style: { marginRight: "0.2rem" },
              }}
              className="transition-transform"
              description={emailFormatter(email)}
              name={displayNameFormatter(displayName)}
            />
            <Button
              isIconOnly
              color="default"
              aria-label="reset"
              onClick={handleReset}
              size="sm"
            >
              <X size={20} />
            </Button>
          </div>
          <Image
            width={400}
            height={600}
            alt="Preview image"
            src={previewImage}
            isBlurred
            loading="lazy"
          />
          <p className="text-center text-sm text-gray-300 absolute bottom-0 z-20 right-0 m-5">
            <span className="font-bold">0</span> Tricks! 🎃
          </p>
        </div>
        <Button
          className="mt-3 bg-orange-600 shadow-lg shadow-orange-600 text-white"
          variant="shadow"
          fullWidth
          isDisabled={diableCreatePost}
          onClick={handleSubmit}
          ref={postButtonRef}
          isLoading={loading}
        >
          Create post 👻
        </Button>
      </div>
    </div>
  );
};

PreviewPost.propTypes = {
  previewImage: PropTypes.string.isRequired,
  processing: PropTypes.bool.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  postButtonRef: PropTypes.object,
  loading: PropTypes.bool,
  wasGenerated: PropTypes.bool,
};

export default PreviewPost;
