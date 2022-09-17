import { Box, Skeleton } from '@chakra-ui/react';
import SlickSlider from '../SlickSlider/SlickSlider';

type PropTypes = {
  width: string | number;
  height: string | number;
  numCards: number;
};

const SliderPlaceholder = ({ width, height, numCards }: PropTypes) => {
  return (
    <Box>
      <SlickSlider slideToShow={numCards}>
        {Array.from({ length: numCards }, (v, i) => i).map((item) => (
          <Box key={item} px="3">
            <Skeleton width={width} height={height} borderRadius="md" borderTopRightRadius="20px" />
          </Box>
        ))}
      </SlickSlider>
    </Box>
  );
};

SliderPlaceholder.defaultProps = {
  width: '100%',
  height: '200px',
  numCards: 5,
};

export default SliderPlaceholder;
