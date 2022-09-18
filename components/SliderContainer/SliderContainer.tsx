import { Box, Heading } from '@chakra-ui/react';

type PropTypes = {
  title: string;
  children: React.ReactNode;
};

const SliderContainer = ({ title, children }: PropTypes) => {
  return (
    <Box bg="gradient.slider" h="auto" py="5" w="100%" mt={10}>
      <Box w={'100%'} h="100%" pos="relative" className="container" pl={['4rem', '5rem']}>
        <Heading
          size="md"
          transform="translateX(-50%) translateY(-50%) rotate(-90deg)"
          position="absolute"
          top="50%"
          left={5}
        >
          {title}
        </Heading>
        {children}
      </Box>
    </Box>
  );
};

export default SliderContainer;
