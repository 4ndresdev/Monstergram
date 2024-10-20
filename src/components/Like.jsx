import PropTypes from "prop-types";
import { Button } from "@nextui-org/button";

const Like = ({ isLiked, totalLikes, onLikeToggle, forwardedRef }) => {
  return (
    <Button
      as="div"
      size="md"
      className="bg-gray-800"
      onClick={onLikeToggle}
      ref={forwardedRef}
    >
      <div>
        <span className={`text-lg ${!isLiked && "grayscale"}`}>🎃</span>
        <span className="text-white ml-2">
          {isLiked ? `${totalLikes} tricks` : "Like or trick"}
        </span>
      </div>
    </Button>
  );
};

Like.propTypes = {
  isLiked: PropTypes.bool,
  totalLikes: PropTypes.number,
  onLikeToggle: PropTypes.func,
  forwardedRef: PropTypes.object,
};

export default Like;
