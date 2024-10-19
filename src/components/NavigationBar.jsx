import { Button } from "@nextui-org/button";

const NavigationBar = () => {
  return (
    <div className="hidden md:flex md:gap-2">
      <Button size="sm" radius="full" className="bg-orange-600 text-white">
        👻 Create Spooky Image
      </Button>
    </div>
  );
};

export default NavigationBar;
