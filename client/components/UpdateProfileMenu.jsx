import React from 'react';
import { VStack, Button, useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import ChangePasswordForm from './ChangePasswordForm';
import ChangeUsernameForm from './ChangeUsernameForm';
import ChangeProfilePictureForm from './ChangeProfilePictureForm';
import DeleteAccountForm from './DeleteAccountForm';

export default function UpdateProfileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeItem, setActiveItem] = React.useState('');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    onOpen();
  };

  return (
    <div>
      <VStack spacing={4}>
        <Button variant="ghost" onClick={() => handleItemClick('Change Profile Picture')}>Update Profile Picture</Button>
        <Button variant="ghost" onClick={() => handleItemClick('Change Username')}>Change Username</Button>
        <Button variant="ghost" onClick={() => handleItemClick('Change Password')}>Update Password</Button>
        <Button variant="ghost" onClick={() => handleItemClick('Delete Account')}>Delete Account</Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update {activeItem}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {activeItem === 'Change Password' && <ChangePasswordForm />}
            {activeItem === 'Change Username' && <ChangeUsernameForm />}
            {activeItem === 'Change Profile Picture' && <ChangeProfilePictureForm />}
            {activeItem === 'Delete Account' && <DeleteAccountForm />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
