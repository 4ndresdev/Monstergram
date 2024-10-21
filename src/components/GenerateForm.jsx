import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Textarea } from "@nextui-org/input";
import { WandSparkles } from "lucide-react";
import realist from "../assets/generate/realist.jpeg";
import pixar from "../assets/generate/pixar.jpg";
import { Switch } from "@nextui-org/switch";

const GenerateForm = () => {
  return (
    <div className="mt-5 text-lg flex flex-col gap-6">
      <h1 className="text-xl text-white font-bold">Create from scratch</h1>
      <div>
        <Textarea
          variant="filled"
          label="Describe your idea"
          className="max-w-full"
          classNames={{
            inputWrapper: "bg-gray-900 hover:bg-gray-900 active:bg-gray-900",
          }}
        />
        <div className="flex justify-end mt-2">
          <Button size="sm" variant="flat" color="warning">
            <WandSparkles size={15} />
            Inspire me
          </Button>
        </div>
      </div>
      <h2 className="text-md text-white">Choose a style 🎃</h2>
      <div className="flex flex-nowrap gap-3">
        <div className="w-full max-w-32 flex justify-center items-center overflow-hidden cursor-pointer">
          <Image
            width="auto"
            alt="NextUI hero Image"
            className="object-cover"
            src={realist}
          />
        </div>
        <div className="w-full max-w-32 flex justify-center items-center overflow-hidden cursor-pointer">
          <Image
            width="auto"
            alt="NextUI hero Image"
            className="object-cover"
            src={pixar}
          />
        </div>
      </div>
      <Switch
        color="warning"
        className="text-white text-sm"
        classNames={{ label: "text-white text-sm", wrapper: "bg-gray-900" }}
      >
        Remove something on the image
      </Switch>
      <Textarea
        variant="filled"
        label="What do you want to remove?"
        className="max-w-full"
        minRows={2}
        classNames={{
          inputWrapper: "bg-gray-900 hover:bg-gray-900 active:bg-gray-900",
        }}
      />
      <Button color="warning">
        <WandSparkles size={15} />
        Generate
      </Button>
    </div>
  );
};

export default GenerateForm;
