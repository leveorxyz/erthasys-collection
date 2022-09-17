import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  Icon,
  Input,
  Button,
  useToast,
  useBoolean,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import { useForm } from 'react-hook-form';
import { BiChart } from 'react-icons/bi';
import Card from '../../components/Card/Card';
import SiteTitle from '../../components/SiteTitle/SiteTitle';
import fpContract from '../../config/fpContract';
import ccContract from '../../config/ccContract';
import web3 from '../../config/web3';
import { PROTOCOL_ABI, PROTOCOL_ADDRESS } from '../../config/fpContract';
import { CC_CONTRACT_ABI, CC_CONTRACT_ADDRESS } from '../../config/ccContract';
import { NFTType } from '../../interfaces';
import Loading from '../../components/Loading/Loading';
import { getFormattedDate } from '../../utils/helpers';

type FormDataType = {
  amount: string;
};

const BurnCarbonCredit: NextPage = () => {
  const [nft, setNft] = useState<NFTType>();
  const [isLoading, setIsLoading] = useBoolean();
  const [isFormLoading, setIsFormLoading] = useBoolean();
  const [currentBalance, setCurrentBalance] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataType>();
  const { performActions, address } = useContractKit();
  const toast = useToast();
  const router = useRouter();
  const { nftId } = router.query;

  const getCarbonCreditBalance = async () => {
    try {
      const res = await ccContract.methods.balanceOf(address).call();
      setCurrentBalance(+web3.utils.fromWei(res));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNftDetails = async () => {
    try {
      setIsLoading.on();
      const res = await fpContract.methods.getMintedNftListOfSingleUser(address).call();
      const resData: NFTType[] = res.map((item: string[]) => Object.assign({}, item));
      const foundData = resData.find((item) => item.nftID === nftId);

      if (foundData) {
        setNft(foundData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading.off();
    }
  };

  const handleFormSubmit = async (data: FormDataType) => {
    try {
      setIsFormLoading.on();
      await performActions(async (kit) => {
        const fpContract = new kit.web3.eth.Contract(PROTOCOL_ABI, PROTOCOL_ADDRESS);
        const carbonContract = new kit.web3.eth.Contract(CC_CONTRACT_ABI, CC_CONTRACT_ADDRESS);

        const weiAmount = kit.web3.utils.toWei(data.amount);
        // Approve the spending amount
        await carbonContract.methods.approve(PROTOCOL_ADDRESS, weiAmount).send({
          from: kit.defaultAccount,
          gasLimit: 1000000,
          gasPrice: kit.gasPrice,
        });

        const res = await fpContract.methods.burnCarbonCredit(nftId, weiAmount).send({
          from: kit.defaultAccount,
          gasLimit: 10000000,
          gasPrice: kit.gasPrice,
        });
        if (res?.status) {
          reset();
          fetchNftDetails();
          getCarbonCreditBalance();
          toast({
            title: 'Success!',
            description: 'Carbon Credit Burned successfully!',
            status: 'success',
            isClosable: true,
          });
        }
      });
    } catch (err: any) {
      console.log(err);
      toast({
        title: 'Error!',
        description: err?.message,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsFormLoading.off();
    }
  };

  useEffect(() => {
    fetchNftDetails();
    if (address) {
      getCarbonCreditBalance();
    }
    // eslint-disable-next-line
  }, [nftId, address]);

  if (isLoading) return <Loading />;

  return (
    <Box className="container" mt={20}>
      <SiteTitle title="Burn Carbon Credit" />
      <Flex mb={20} wrap="wrap">
        <Card height="100%" width="auto">
          <Image src={nft?.uri} alt="NFT" width="290px" height="300px" borderTopRightRadius={20} />
        </Card>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box ml={[0, 10]} mt={[10, 0]}>
            <Heading size="md">Burn Carbon Credit Balance</Heading>
            <Text my={3}>{nft?.name}</Text>
            <Flex>
              <Text fontSize="sm">Amount required to burn per week: </Text>
              <Image src="/images/cusd.svg" alt="cUSD" width="15px" mx={2} />
              <Text fontSize="sm">10</Text>
            </Flex>
            <Text fontSize="sm">Expiry Date: {getFormattedDate(nft?.expirationDate)}</Text>

            <Box mt={20}>
              <Box>
                <p>Your current Carbon Token balance: {currentBalance.toLocaleString()}</p>
                <Flex mt="3" justifyContent="space-between" flexDir={['column', 'row']}>
                  <Box w="100%">
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
                        {...register('amount', {
                          required: true,
                          min: 1000,
                        })}
                        min={1000}
                        isInvalid={!!errors?.amount}
                      />
                    </InputGroup>
                  </Box>
                  <Box ml={[0, 10]} mt={[5, 0]} w="100%">
                    <Button isFullWidth type="submit" isLoading={isFormLoading}>
                      Burn Carbon Credit
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </form>
      </Flex>
    </Box>
  );
};

export default BurnCarbonCredit;
