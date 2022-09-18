import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  Box,
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  Input,
  Icon,
  Button,
  useDisclosure,
  useMediaQuery,
  Tooltip,
  HStack,
} from '@chakra-ui/react';
import { IoSearch, IoMenu, IoChevronBackOutline } from 'react-icons/io5';
import { useContractKit } from '@celo-tools/use-contractkit';
import MobileDrawer from './MobileDrawer';

const Header = () => {
  const [isMobile] = useMediaQuery('(max-width: 991px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connect, address, destroy } = useContractKit();

  const router = useRouter();
  const isAdmin = useMemo(() => router.pathname.includes('admin'), [router.pathname]);

  const handleConnect = () => {
    connect().catch((err) => console.log(err));
  };

  return (
    <Box py={4}>
      <Box className="container">
        <Flex as="nav" justifyContent="space-between">
          {router.pathname !== '/' && (
            <Button variant="link" position="absolute" mt={10} onClick={() => router.back()}>
              <Icon as={IoChevronBackOutline} fontSize="2xl" />
            </Button>
          )}
          <HStack gap={7}>
            <Link href={isAdmin ? '/admin' : '/'}>
              <a>
                <Image src="/images/logo.svg" alt="Fomet" />
              </a>
            </Link>

            {!isMobile && (
              <>
                <Link href="#!">
                  <a>
                    <Button variant="link" color="white">
                      Explore
                    </Button>
                  </a>
                </Link>
                <Link href="#!">
                  <a>
                    <Button variant="link" color="white">
                      About
                    </Button>
                  </a>
                </Link>
                <Link href="#!">
                  <a>
                    <Button variant="link" color="white">
                      How It Works
                    </Button>
                  </a>
                </Link>
              </>
            )}
          </HStack>
          {!isMobile && (
            <HStack gap={7}>
              <InputGroup width="320px">
                <InputRightElement pointerEvents="none">
                  <Icon as={IoSearch} color="white" fontWeight="bold" />
                </InputRightElement>
                <Input
                  type="search"
                  placeholder="Search your interest"
                  background="gradient.inputBg"
                  backdropFilter="blur(40.1868px)"
                  borderTopRightRadius="20px"
                  borderBottomLeftRadius="20px"
                />
              </InputGroup>

              {isAdmin ? (
                <Link href="/admin/load-nfts">
                  <a>
                    <Button>Load New NFTs</Button>
                  </a>
                </Link>
              ) : (
                <Link href="/add-carbon-credit">
                  <a>
                    <Button>Add Balance</Button>
                  </a>
                </Link>
              )}

              {address ? (
                <Tooltip
                  label={`Connected with ${address.slice(0, 4)}...${address.slice(38)}`}
                  aria-label="A tooltip"
                  borderRadius="5"
                  bg="#F6F5F5"
                  color="black"
                  fontSize="12"
                >
                  <Button onClick={destroy}>Disconnect Wallet</Button>
                </Tooltip>
              ) : (
                <Button onClick={handleConnect}>Connect Wallet</Button>
              )}
            </HStack>
          )}
          {isMobile && (
            <Button variant="link" onClick={onOpen}>
              <IoMenu size="30" />
            </Button>
          )}
        </Flex>
        <MobileDrawer onClose={onClose} isOpen={isOpen} />
      </Box>
    </Box>
  );
};

export default Header;
