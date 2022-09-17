import { Dispatch, SetStateAction } from 'react';
import { Center, Heading, Button, VStack, useBoolean, useToast } from '@chakra-ui/react';
import { useContractKit } from '@celo-tools/use-contractkit';
import { PROTOCOL_ABI, PROTOCOL_ADDRESS } from '../../config/fpContract';

type PropTypes = {
  setIsOnboarded: Dispatch<SetStateAction<boolean>>;
};
const UserOnboard = ({ setIsOnboarded }: PropTypes) => {
  const [isLoading, setIsLoading] = useBoolean();
  const { performActions } = useContractKit();
  const toast = useToast();

  const handleOnboard = async () => {
    try {
      setIsLoading.on();
      await performActions(async (kit) => {
        const fpContract = new kit.web3.eth.Contract(PROTOCOL_ABI, PROTOCOL_ADDRESS);
        const res = await fpContract.methods.addUserOnboard(kit.defaultAccount).send({
          from: kit.defaultAccount,
          gasLimit: 10000000,
          gasPrice: kit.gasPrice,
        });
        if (res?.status) {
          setIsOnboarded(true);
          toast({
            title: 'Registered Successfully!',
            description: 'Congratulations! You are now registered.',
            status: 'success',
            isClosable: true,
          });
        }
      });
    } catch (err: any) {
      toast({
        title: 'Error Registering User!',
        description: err?.message,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsLoading.off();
    }
  };

  return (
    <Center alignItems="center" h="calc(100vh - 435px)">
      <VStack gap={4} textAlign="center">
        <Heading>You are not registered yet!</Heading>
        <Heading size="sm" mt="3">
          Click register button to register.
        </Heading>
        <Button onClick={handleOnboard} isLoading={isLoading}>
          Register
        </Button>
      </VStack>
    </Center>
  );
};

export default UserOnboard;
