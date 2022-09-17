import { SimpleGrid, Box, Text, VStack, HStack, Heading, Icon } from '@chakra-ui/react';
import { IoLogoYoutube, IoLogoDiscord, IoLogoInstagram } from 'react-icons/io5';

const Footer = () => {
  return (
    <Box
      bg="linear-gradient(180deg, rgba(28, 43, 112, 0) 12.71%, rgba(83, 64, 167, 0.4) 100%)"
      backdropFilter="blur(4px)"
      as="footer"
    >
      <Box className="container">
        <SimpleGrid columns={[1, 4, 5]} spacing={10} py={10} mt={10}>
          <Box gridColumn={['1 span', '2 span']}>
            <Heading size="md" color="white">
              ProjectX
            </Heading>
            <Text mt={5} color="whiteAlpha.600" fontWeight="medium">
              Project X is a simplified version of a social game prototype. Dive in the universe of
              unique NFTs to explore, play, mint, hold, trade or feed it with carbon credits!
            </Text>
          </Box>
          <Box>
            <VStack align="flex-start" gap="20px" color="whiteAlpha.600">
              <Heading size="md" color="white">
                About
              </Heading>
              <a href="#!">Product</a>
              <a href="#!">Terms & Condition</a>
              <a href="#!">FAQ</a>
            </VStack>
          </Box>
          <Box>
            <VStack align="flex-start" gap="20px" color="whiteAlpha.600">
              <Heading size="md" color="white">
                Company
              </Heading>
              <a href="#!">Our Team</a>
              <a href="#!">Partner With Us</a>
              <a href="#!">Privacy & Policy</a>
            </VStack>
          </Box>
          <Box>
            <VStack align="flex-start" gap="20px" color="whiteAlpha.600">
              <Heading size="md" color="white">
                Contact
              </Heading>
              <a href="#!">+1 339-707-5370</a>
              <a href="mailto:saquib@terolabs.org">saquib@terolabs.org</a>
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
