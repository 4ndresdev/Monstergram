import PropTypes from "prop-types";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { User } from "@nextui-org/user";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { displayNameFormatter, emailFormatter } from "../utils/string.format";
import Like from "./Like";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const { user } = useContext(AuthContext);
  const { email, displayName, photoURL } = user;

  const handleLikeToggle = () => {
    setIsLiked((liked) => !liked);
    if (isLiked) {
      setTotalLikes((likes) => likes - 1);
    } else {
      setTotalLikes((likes) => likes + 1);
    }
  };

  return (
    <Card
      className="w-full bg-gray-900 text-white rounded-lg p-3 border-4 border-gray-800 relative overflow-hidden mt-5"
      shadow="sm"
      key={post.id}
      isPressable
      onPress={() => console.log("item pressed")}
    >
      <CardBody className="overflow-visible p-0 cursor-pointer relative">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt="Image"
          className="w-full object-cover h-96"
          src={post.image}
        />
      </CardBody>
      <CardFooter className="px-3 text-medium flex flex-col items-start gap-5">
        <Like
          isLiked={isLiked}
          totalLikes={totalLikes}
          onLikeToggle={handleLikeToggle}
        />
        <p className="text-start">{post.prompt}</p>
        <div className="w-full flex justify-between items-center">
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
            description={emailFormatter(email)}
            name={displayNameFormatter(displayName)}
          />
          <span className="text-sm text-default-400">A few minutes ago</span>
        </div>
      </CardFooter>
    </Card>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    prompt: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default Post;
