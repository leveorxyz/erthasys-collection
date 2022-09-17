import { Box } from '@chakra-ui/react';

type PropTypes = {
  width: number | string;
  height: number | string;
  children: React.ReactNode;
};

const Card = ({ width, height, children }: PropTypes) => {
  return (
    <Box
      w={['auto', width]}
      minH={['auto', height]}
      bg="gradient.nftcard"
      borderTopRightRadius={20}
      borderColor="whiteAlpha.400"
      borderWidth="1.25px"
      backdropFilter="blur(69.3223px)"
      p="15px"
      _hover={{
        background: 'gradient.nftcardHover',
      }}
      transition="0.3s all"
    >
      {children}
    </Box>
  );
};

Card.defaultProps = {
  width: '235px',
  height: '287px',
};

export default Card;
