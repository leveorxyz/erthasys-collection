import { Image, Text, Button, useToast, useBoolean } from '@chakra-ui/react';
import { useContractKit } from '@celo-tools/use-contractkit';
import Card from './Card';
import { getFormattedDate } from '../../utils/helpers';
import { PROTOCOL_ABI, PROTOCOL_ADDRESS } from '../../config/fpContract';

type PropTypes = {
  width?: number | string;
  height?: number | string;
  thumbnail?: string;
  thumbnailHeight?: string;
  title: string;
  nftId: string;
  expiryDate: string;
  holdingNftId: string | undefined;
  owner: string | undefined;
};

const TradeWithCard = ({
  width,
  height,
  title,
  thumbnail,
  thumbnailHeight,
  expiryDate,
  nftId,
  holdingNftId,
  owner,
}: PropTypes) => {
  const [isLoading, setIsLoading] = useBoolean();
  const { performActions } = useContractKit();
  const toast = useToast();

  const handleTrade = async () => {
    try {
      setIsLoading.on();
      await performActions(async (kit) => {
        const fpContract = new kit.web3.eth.Contract(PROTOCOL_ABI, PROTOCOL_ADDRESS);

        const res = await fpContract.methods.addTradeRequest(owner, holdingNftId, nftId).send({
          from: kit.defaultAccount,
          gasLimit: 10000000,
          gasPrice: kit.gasPrice,
        });
        if (res?.status) {
          toast({
            title: 'Success!',
            description: 'Trade request placed successfully',
            status: 'success',
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
      <Text fontSize="13px">
        <b>Expiry Date:</b> {getFormattedDate(expiryDate)}
      </Text>
      <Text fontSize="13px">
        <b>Owner: </b>
        {owner?.slice(36)}...you
      </Text>
      <Button mt={3} w="100%" isLoading={isLoading} onClick={handleTrade}>
        Request Trade
      </Button>
    </Card>
  );
};

export default TradeWithCard;
