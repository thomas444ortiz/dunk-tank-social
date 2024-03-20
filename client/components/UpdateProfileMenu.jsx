import React from 'react';
import { VStack, Text, useDisclosure, Divider, Icon, Box } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
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
    <div className="update-profile-menu">
      <VStack divider={<Divider />} spacing={4} align="stretch">
        <Box as="header" pt="4" pr="4" pl="0" pb="0" color="black" fontSize="lg" fontWeight="bold">
          Update Profile Information
        </Box>
        <Text as="button" variant="ghost" onClick={() => handleItemClick('Change Profile Picture')} style={{ justifyContent: 'space-between', display: 'flex', color: 'black', width: '100%' }}>
          Update Profile Picture <Icon as={ArrowForwardIcon} ml="auto" w={5} h={5} />
        </Text>
        <Text as="button" variant="ghost" onClick={() => handleItemClick('Change Username')} style={{ justifyContent: 'space-between', display: 'flex', color: 'black', width: '100%' }}>
          Change Username <Icon as={ArrowForwardIcon} ml="auto" w={5} h={5} />
        </Text>
        <Text as="button" variant="ghost" onClick={() => handleItemClick('Change Password')} style={{ justifyContent: 'space-between', display: 'flex', color: 'black', width: '100%' }}>
          Update Password <Icon as={ArrowForwardIcon} ml="auto" w={5} h={5} />
        </Text>
        <Text as="button" variant="ghost" onClick={() => handleItemClick('Delete Account')} style={{ justifyContent: 'space-between', display: 'flex', color: 'black', width: '100%' }}>
          Delete Account <Icon as={ArrowForwardIcon} ml="auto" w={5} h={5} />
        </Text>
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
