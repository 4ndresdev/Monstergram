import PropTypes from "prop-types";
import { Button } from "@nextui-org/button";

const Like = ({ isLiked, totalLikes, onLikeToggle }) => {
  return (
    <Button size="md" className="bg-gray-800" onClick={onLikeToggle}>
      <span className={`text-lg ${!isLiked && "grayscale"}`}>🎃</span>
      <span className="text-white ml-2">
        {isLiked ? `${totalLikes} tricks` : "Like or trick"}
      </span>
    </Button>
  );
};

Like.propTypes = {
  isLiked: PropTypes.bool,
  totalLikes: PropTypes.number,
  onLikeToggle: PropTypes.func,
};

export default Like;
