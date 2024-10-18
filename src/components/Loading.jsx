import Lottie from "lottie-react";
import zombies from "../assets/lotties/zombie.json";

const Loading = () => {
  return (
    <div className="w-screen h-screen fixed flex flex-col justify-center items-center z-50">
      <Lottie animationData={zombies} loop={true} style={{ width: 130 }} />
      <small className="text-white">¡Franki the dancer!</small>
    </div>
  );
};

export default Loading;
