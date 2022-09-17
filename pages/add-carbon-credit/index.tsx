import {
  Box,
  Image,
  Heading,
  HStack,
  Text,
  InputGroup,
  InputRightElement,
  Icon,
  Input,
  Button,
  useBoolean,
  useToast,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useContractKit } from '@celo-tools/use-contractkit';
import { BiChart } from 'react-icons/bi';
import SiteTitle from '../../components/SiteTitle/SiteTitle';
import { PROTOCOL_ABI, PROTOCOL_ADDRESS } from '../../config/fpContract';
import { CC_CONTRACT_ABI, CC_CONTRACT_ADDRESS } from '../../config/ccContract';
import ccContract from '../../config/ccContract';
import web3 from '../../config/web3';

type FormDataType = {
  amount: string;
};

const AddCarbonCredit: NextPage = () => {
  const [isLoading, setIsLoading] = useBoolean();
  const [currentBalance, setCurrentBalance] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>();
  const { performActions, address } = useContractKit();
  const toast = useToast();

  const getCarbonCreditBalance = async () => {
    try {
      const res = await ccContract.methods.balanceOf(address).call();
      setCurrentBalance(+web3.utils.fromWei(res));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (data: FormDataType) => {
    try {
      setIsLoading.on();
      await performActions(async (kit) => {
        const fpContract = new kit.web3.eth.Contract(PROTOCOL_ABI, PROTOCOL_ADDRESS);
        const carbonContract = new kit.web3.eth.Contract(CC_CONTRACT_ABI, CC_CONTRACT_ADDRESS);
        const weiAmount = kit.web3.utils.toWei(data.amount);
        // Approve the spending amount
        await carbonContract.methods.approve(PROTOCOL_ADDRESS, weiAmount).send({
          from: kit.defaultAccount,
          gasLimit: 10000000,
          gasPrice: kit.gasPrice,
        });

        const res = await fpContract.methods.addBalance(weiAmount).send({
          from: kit.defaultAccount,
          gasLimit: 10000000,
          gasPrice: kit.gasPrice,
        });
        if (res?.status) {
          getCarbonCreditBalance();
          reset();
          toast({
            title: 'Success!',
            description: 'Balance added successfully!',
            status: 'success',
            isClosable: true,
          });
        }
      });
    } catch (err: any) {
      toast({
        title: 'Error!',
        description: err?.message,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsLoading.off();
    }
  };

  useEffect(() => {
    if (address) {
      getCarbonCreditBalance();
    }
    // eslint-disable-next-line
  }, [address]);

  return (
    <Box className="container" pt={20}>
      <SiteTitle title="Add Carbon Credit" />
      <Box>
        <Heading size="md" mb="2">
          Add Carbon Credit Balance
        </Heading>
        <p>Your current Carbon Token balance: {currentBalance.toLocaleString()}</p>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <HStack mt={10} gap={[5, 20]} flexDir={['column', 'row']}>
            <Box w={['100%', 'auto']}>
              <InputGroup>
                <InputRightElement pointerEvents="none">
                  <Icon as={BiChart} color="white" fontWeight="bold" />
                </InputRightElement>
                <Input
                  type="number"
                  placeholder="Enter Amount"
                  background="gradient.inputBg"
                  backdropFilter="blur(40.1868px)"
                  borderTopRightRadius="20px"
                  borderBottomLeftRadius="20px"
                  {...register('amount', { required: true })}
                  isInvalid={!!errors?.amount}
                />
              </InputGroup>
            </Box>
            <Box ml={[0, 10]} w={['100%', 'auto']}>
              <Button isFullWidth={true} type="submit" isLoading={isLoading}>
                Add Balance
              </Button>
            </Box>
          </HStack>
        </form>
        <HStack mt={5}>
          <Text>Price in cUSD:</Text>
          <Image src="/images/cusd.svg" alt="cUSD" width="15px" />
          <Text>3.78</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default AddCarbonCredit;
