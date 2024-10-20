import { useContext, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { User } from "@nextui-org/user";
import confetti from "canvas-confetti";
import { AuthContext } from "../context/AuthContext";
import { displayNameFormatter, emailFormatter } from "../utils/string.format";
import Like from "./Like";
import { useDisclosure } from "@nextui-org/modal";
import PreviewImage from "./PreviewImage";

const Post = ({ post }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const { user } = useContext(AuthContext);
  const buttonLikeRef = useRef(null);

  const { email, displayName, photoURL } = user;

  const handleLikeToggle = () => {
    setIsLiked((liked) => !liked);
    if (isLiked) {
      setTotalLikes((likes) => likes - 1);
    } else {
      const rect = buttonLikeRef.current.getBoundingClientRect();
      let originX = (rect.x + 0.5 * rect.width) / window.innerWidth;
      let originY = (rect.y + 0.5 * rect.height) / window.innerHeight;
      let scalar = 2;
      let pumpkin = confetti.shapeFromText({ text: "🎃", scalar });
      let bat = confetti.shapeFromText({ text: "💀", scalar });
      let ghost = confetti.shapeFromText({ text: "👻", scalar });
      confetti({
        particleCount: 100,
        spread: 40,
        origin: { y: originY, x: originX },
        shapes: [pumpkin, bat, ghost],
      });
      setTotalLikes((likes) => likes + 1);
    }
  };

  return (
    <>
      <Card
        className="w-full bg-gray-900 text-white rounded-lg p-3 border-4 border-gray-800 relative overflow-hidden mt-5"
        shadow="sm"
        key={post.id}
        isPressable
        onPress={onOpen}
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
            forwardedRef={buttonLikeRef}
          />
          <p className="text-start">{post.prompt}</p>
          <div className="w-full flex justify-between items-center">
            <User
              as="div"
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
      <PreviewImage
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        imageURL={post.image}
      />
    </>
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
