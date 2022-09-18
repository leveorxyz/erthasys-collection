import { SimpleGrid, Box, Text, VStack, HStack, Heading, Icon } from '@chakra-ui/react';
import { IoLogoYoutube, IoLogoDiscord, IoLogoInstagram } from 'react-icons/io5';

const Footer = () => {
  return (
    <Box backdropFilter="blur(4px)" bg="darkGreen.100" as="footer" color="white">
      <Box className="container">
        <SimpleGrid columns={[1, 4, 5]} spacing={10} py={10} mt={10}>
          <Box gridColumn={['1 span', '2 span']}>
            <Heading size="md">Erthasys Collection</Heading>
            <Text mt={5} fontWeight="medium">
              Erthasys Collection is a simplified version of a social game prototype. Dive in the
              universe of unique NFTs to explore, play, mint, hold, trade or feed it with carbon
              credits!
            </Text>
          </Box>
          <Box>
            <VStack align="flex-start" gap="20px">
              <Heading size="md">About</Heading>
              <a href="#!">Product</a>
              <a href="#!">Terms & Condition</a>
              <a href="#!">FAQ</a>
            </VStack>
          </Box>
          <Box>
            <VStack align="flex-start" gap="20px">
              <Heading size="md">Company</Heading>
              <a href="#!">Our Team</a>
              <a href="#!">Partner With Us</a>
              <a href="#!">Privacy & Policy</a>
            </VStack>
          </Box>
          <Box>
            <VStack align="flex-start" gap="20px">
              <Heading size="md">Contact</Heading>
              <a href="#!">+x xxx-xxx-xxxx</a>
              <a href="mailto:contact@leveor.xyz">contact@leveor.xyz</a>
              <HStack fontSize={23} gap={10}>
                <a href="#!">
                  <Icon as={IoLogoYoutube} />
                </a>
                <a href="#!">
                  <Icon as={IoLogoDiscord} />
                </a>
                <a href="#!">
                  <Icon as={IoLogoInstagram} />
                </a>
              </HStack>
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Footer;
