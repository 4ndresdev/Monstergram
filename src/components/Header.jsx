import { Image } from "@nextui-org/image";
import logo from "../assets/login/logo.webp";
import Profile from "./Profile";
import NavigationBar from "./NavigationBar";

const Header = () => {
  return (
    <div className="w-full py-3 border-b border-gray-800 z-50 sticky top-0 bg-gray-900">
      <div className="container mx-auto flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Image
            isBlurred
            width={35}
            height={35}
            src={logo}
            alt="Halloween logo"
          />
          <h2 className="text-sm md:text-lg translate-y-0.5 font-semibold">
            MonsterGram
          </h2>
        </div>
        <div className="flex gap-4 items-center">
          <NavigationBar />
          <div className="h-8 border-l border-gray-800 hidden md:flex"></div>
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
