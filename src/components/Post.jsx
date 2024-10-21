import { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { User } from "@nextui-org/user";
import confetti from "canvas-confetti";
import { displayNameFormatter, emailFormatter } from "../utils/string.format";
import Like from "./Like";
import { useDisclosure } from "@nextui-org/modal";
import PreviewImage from "./PreviewImage";
import useGenerate from "../hooks/useGenerate";
import { AuthContext } from "../context/AuthContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Post = ({ post }) => {
  const { email, displayName, photoURL } = post.user;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(Object.keys(post.likes).length);
  const buttonLikeRef = useRef(null);
  const { addUserLike, removeUserLike } = useGenerate();
  const { user } = useContext(AuthContext);

  const handleLikeToggle = async () => {
    setIsLiked((liked) => !liked);
    if (isLiked) {
      setTotalLikes((likes) => likes - 1);
      await removeUserLike(post.id, user.uid);
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
      await addUserLike(post.id, user.uid);
    }
  };

  useEffect(() => {
    setIsLiked(post.likes?.[user.uid] || false);
    setTotalLikes(Object.keys(post.likes).length);
  }, [user, post.likes]);

  return (
    <>
      <Card
        className="w-full bg-gray-900 text-white rounded-lg p-3 border-4 border-gray-800 relative overflow-hidden mt-5"
        shadow="sm"
        key={post.id}
        isPressable
        onPress={onOpen}
      >
        <CardBody className="p-0 cursor-pointer relative h-96 max-h-96 overflow-hidden flex items-start justify-center">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            height="100%"
            alt="Post image"
            className="w-full object-cover"
            src={post.image}
            loading="lazy"
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
            <span className="text-sm text-default-400">
              {dayjs(post.timestamp).fromNow()}
            </span>
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
    id: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.object,
    timestamp: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      photoURL: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Post;
