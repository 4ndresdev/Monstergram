import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="md:flex md:gap-2">
      <Button
        size="sm"
        radius="full"
        className="bg-orange-600 text-white fixed bottom-0 inset-x-0 mx-auto w-48 p-5 mb-6 md:p-0 md:relative md:bottom-auto md:mx-0 md:mb-0"
        onClick={() => handleNavigate("/generate")}
      >
        👻 Create Spooky Image
      </Button>
    </div>
  );
};

export default NavigationBar;
