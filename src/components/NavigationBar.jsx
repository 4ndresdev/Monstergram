import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="hidden md:flex md:gap-2">
      <Button
        size="sm"
        radius="full"
        className="bg-orange-600 text-white"
        onClick={() => handleNavigate("/generate")}
      >
        👻 Create Spooky Image
      </Button>
    </div>
  );
};

export default NavigationBar;
