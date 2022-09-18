import Link from 'next/link';
import {
  Image,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
} from '@chakra-ui/react';
import { useContractKit } from '@celo-tools/use-contractkit';

type PropTypes = {
  onClose: () => void;
  isOpen: boolean;
};

const MobileDrawer = ({ onClose, isOpen }: PropTypes) => {
  const { connect, address, destroy } = useContractKit();

  const handleConnect = () => {
    connect().catch((err) => console.log(err));
  };

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen} closeOnOverlayClick>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton color="white" fontSize={16} />
        <DrawerHeader borderBottomWidth="1px" bg="blue.100">
          <Image src="/images/logo.svg" alt="SuperNova" width="60px" />
        </DrawerHeader>
        <DrawerBody bg="blue.100">
          <VStack alignItems="flex-start" gap={15}>
            <Link href="#!">
              <a>
                <Button variant="link" mt="5">
                  Explore
                </Button>
              </a>
            </Link>
            <Link href="#!">
              <a>
                <Button variant="link">About</Button>
              </a>
            </Link>
            <Link href="#!">
              <a>
                <Button variant="link">How It Works</Button>
              </a>
            </Link>
            <Link href="/add-carbon-credit">
              <a>
                <Button>Add Balance</Button>
              </a>
            </Link>
            {address ? (
              <Button onClick={destroy}>Disconnect Wallet</Button>
            ) : (
              <Button onClick={handleConnect}>Connect Wallet</Button>
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
