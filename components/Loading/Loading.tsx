import { Center, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Center alignItems="center" h="calc(100vh - 435px)">
      <Spinner size="xl" />
    </Center>
  );
};

export default Loading;
