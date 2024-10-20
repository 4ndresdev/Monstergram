import PropTypes from "prop-types";
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { Image } from "@nextui-org/image";

const PreviewImage = ({ isOpen, onOpenChange, imageURL }) => {
  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-0">
          <ModalBody className="p-0">
            <Image className="w-full" alt="NextUI hero Image" src={imageURL} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

PreviewImage.propTypes = {
  onOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  imageURL: PropTypes.string,
};

export default PreviewImage;
