import { useContext } from "react";
import { Image } from "@nextui-org/image";
import { Avatar } from "@nextui-org/avatar";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const { email, displayName, photoURL } = user;
  const emailTruncated = `@${email.split("@")[0]}`;
  return (
    <div className="bg-gray-900 text-white shadow-md rounded-lg mt-5 border border-gray-800 relative">
      <div className="w-full h-20 flex justify-center items-center overflow-hidden rounded-t-lg">
        <Image
          width="100%"
          height="100%"
          alt="NextUI hero Image"
          src="https://res.cloudinary.com/drgzigtsi/image/upload/c_crop,ar_16:9,e_improve/v1729301633/pexels-aleksandar-cvetanovic-605352-1480861_no0t4z.jpg"
          className="w-full object-cover rounded-t-lg"
        />
      </div>
      <Avatar
        isBordered
        color="default"
        src={photoURL}
        className="mx-auto -mt-7 z-10"
        size="lg"
      />
      <div className="body px-5 pt-3 pb-10">
        <h2 className="text-xl font-semibold text-center">{displayName}</h2>
        <p className="text-center text-gray-400">{emailTruncated}</p>
        <p className="text-center text-sm text-gray-300 mt-2">
          This profile is so full of mystery that even ghosts are scared of it!
          🎃
        </p>
        <p className="text-center text-sm text-gray-300 mt-2">10k Boos 👻</p>
      </div>
    </div>
  );
};

export default UserProfile;
