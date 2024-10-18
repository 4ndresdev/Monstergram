import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { signOut, user } = useContext(AuthContext);
  const { email, displayName, photoURL } = user;

  const emailTruncated = `@${email.split("@")[0]}`;
  const displayNameTruncated = `${displayName.slice(0, 10)}...`;

  const handleSignOut = () => {
    signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Error signing out: ${error.message}`);
      });
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
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
            description={emailTruncated}
            name={displayNameTruncated}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{email}</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Profile;
