import { Box, Image, Text, Flex, Button, Center, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import Card from './Card';
import { TradeNFTType } from '../../interfaces';
import { getFormattedDate } from '../../utils/helpers';
import { PROTOCOL_ABI, PROTOCOL_ADDRESS } from '../../config/fpContract';

type PropTypes = {
  nft: TradeNFTType;
  width: string;
  refetchData: () => void;
};

type SingleCardPropTypes = {
  name: string;
  uri: string;
  expiryDate: string;
  owner: string;
};

const SingleCard = ({ name, uri, expiryDate, owner }: SingleCardPropTypes) => (
  <Box width="100%">
    <Image
      src={uri || '/images/bored-ape.png'}
      alt="NFT"
      width="100%"
      height={['120', '200']}
      borderTopRightRadius={20}
    />
    <Text fontWeight="bold" my="2" fontSize="16px" textTransform="capitalize">
      {name}
    </Text>
    <Text fontSize="13px">
      <b>Expiry Date:</b> {getFormattedDate(expiryDate)}
    </Text>
    <Text fontSize="13px">
      <b>Owner:</b> {owner}
    </Text>
  </Box>
);

const TradeNFTCard = ({ width, nft, refetchData }: PropTypes) => {
  const [loading, setLoading] = useState(false);
  const { performActions } = useContractKit();
  const toast = useToast();

  const handleAccept = async () => {
    try {
      setLoading(true);
      await performActions(async (kit) => {
        const paylod = [
          nft.requestedNftName,
          nft.requestedNftId,
          nft.requestedNftOwner,
          nft.requestedNftURI,
          nft.requestedNftExpirationDate,
          nft.myNftName,
          nft.myNftId,
          nft.myNftExpirationDate,
          nft.myNftURI,
        ];
        const fpContract = new kit.web3.eth.Contract(PROTOCOL_ABI, PROTOCOL_ADDRESS);

        const res = await fpContract.methods.acceptTradeRequest(paylod).send({
          from: kit.defaultAccount,
          gasLimit: 10000000,
          gasPrice: kit.gasPrice,
        });
        if (res?.status) {
          refetchData();
          toast({
            title: 'Success!',
            description: 'Trade request accepted successfully',
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
      setLoading(false);
    }
  };

  return (
    <Card width={width} height="auto">
      <Flex justifyContent="space-between">
        <SingleCard
          name={nft.myNftName}
          uri={nft.myNftURI}
          expiryDate={nft.myNftExpirationDate}
          owner="You"
        />
        <Image src={'/images/arrow.svg'} alt="Arrow" width="60px" mx={3} />
        <SingleCard
          name={nft.requestedNftName}
          uri={nft.requestedNftURI}
          expiryDate={nft.requestedNftExpirationDate}
          owner={`...${nft.requestedNftOwner.slice(36)}`}
        />
      </Flex>
      <Center>
        <Button mt="3" onClick={handleAccept} isLoading={loading}>
          Accept Request
        </Button>
      </Center>
    </Card>
  );
};

export default TradeNFTCard;
