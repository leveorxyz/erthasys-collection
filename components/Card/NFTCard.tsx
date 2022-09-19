import { Image, Text, Flex, Button, useBoolean, useToast } from '@chakra-ui/react';
import { useContractKit } from '@celo-tools/use-contractkit';
import Card from './Card';
import { PROTOCOL_ABI, PROTOCOL_ADDRESS } from '../../config/fpContract';
import { getFormattedDate } from '../../utils/helpers';

type PropTypes = {
  width?: number | string;
  height?: number | string;
  thumbnail?: string;
  thumbnailHeight?: string;
  title: string;
  nftId: string;
  claimableDate: string;
  refetchData: () => void;
};

const NftCard = ({
  width,
  height,
  title,
  thumbnail,
  thumbnailHeight,
  claimableDate,
  nftId,
  refetchData,
}: PropTypes) => {
  const [isLoading, setIsLoading] = useBoolean();
  const { performActions } = useContractKit();
  const toast = useToast();

  const handleMinting = async () => {
    try {
      setIsLoading.on();
      await performActions(async (kit) => {
        const fpContract = new kit.web3.eth.Contract(PROTOCOL_ABI, PROTOCOL_ADDRESS);
        await fpContract.methods.mintNFT(nftId).send({
          from: kit.defaultAccount,
          gasLimit: 1000000,
          gasPrice: kit.gasPrice,
        });
      });
      refetchData();
      toast({
        title: 'Success!',
        description: 'NFT Minted Successfully!',
        status: 'success',
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: 'Error Minting!',
        description: err?.message,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsLoading.off();
    }
  };

  return (
    <Card width={width} height={height}>
      <Image
        src={thumbnail || '/images/bored-ape.png'}
        alt="NFT"
        width="100%"
        height={thumbnailHeight || '200'}
        borderTopRightRadius={20}
      />
      <Text fontWeight="bold" my="2" fontSize="16px" textTransform="capitalize">
        {title}
      </Text>
      <Flex justifyContent="space-between" alignItems="center">
        <Text>{getFormattedDate(claimableDate)}</Text>
        {+claimableDate <= new Date().getTime() / 1000 ? (
          <Button onClick={handleMinting} isLoading={isLoading}>
            Buy NFT
          </Button>
        ) : (
          <Button isDisabled>Buy NFT</Button>
        )}
      </Flex>
    </Card>
  );
};

export default NftCard;
