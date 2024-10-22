import PropTypes from "prop-types";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { WandSparkles } from "lucide-react";

const GenerateForm = ({
  setPrompt,
  prompt,
  previewImage,
  handleInspireMe,
  handleGenerate,
  processing,
}) => {
  const bewitchingEnableButton = !previewImage || !prompt || processing;
  const inputsDisabled = !previewImage || processing;
  return (
    <div className="mt-5 text-lg flex flex-col gap-6">
      <h1 className="text-xl text-white font-bold">Create from scratch</h1>
      <div>
        <Textarea
          variant="filled"
          label="Write your spell 🕯️"
          className="max-w-full"
          classNames={{
            inputWrapper:
              "bg-gray-900 text-white hover:text-gray-900 active:text-gray-900",
          }}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          isDisabled={inputsDisabled}
        />
        <div className="flex justify-end mt-3">
          <Button
            size="sm"
            variant="flat"
            color="warning"
            onClick={handleInspireMe}
            isDisabled={inputsDisabled}
          >
            <WandSparkles size={15} />
            Inspire me
          </Button>
        </div>
      </div>
      <Button
        color="warning"
        isDisabled={bewitchingEnableButton}
        onClick={handleGenerate}
      >
        {processing ? "Proccesing..." : "💀 Bewitching image"}
      </Button>
    </div>
  );
};

GenerateForm.propTypes = {
  setPrompt: PropTypes.func.isRequired,
  prompt: PropTypes.string,
  previewImage: PropTypes.string,
  handleInspireMe: PropTypes.func.isRequired,
  handleGenerate: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
};

export default GenerateForm;
