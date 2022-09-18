import Link from 'next/link';
import { Image, Text, Flex, Button } from '@chakra-ui/react';
import Card from './Card';
import { getFormattedDate } from '../../utils/helpers';

type PropTypes = {
  width?: number | string;
  height?: number | string;
  thumbnail?: string;
  thumbnailHeight?: string;
  title: string;
  nftId: string;
  reward: string;
  mintingDate: string;
  expiryDate: string;
};

const MintedNFTCard = ({
  width,
  height,
  title,
  nftId,
  thumbnail,
  thumbnailHeight,
  reward,
  mintingDate,
  expiryDate,
}: PropTypes) => {
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
        <Text>{getFormattedDate(mintingDate)}</Text>
        <Link href={`/trade-nft/${nftId}`}>
          <a>
            <Button>Trade</Button>
          </a>
        </Link>
      </Flex>
      <Text fontSize="13px" my={2}>
        <b>Reward:</b> {reward}
      </Text>
      <Text fontSize="13px">
        <b>Expiry Date:</b> {getFormattedDate(expiryDate)}
      </Text>
      <Button w="100%" mt="2">
        Claim Reward
      </Button>
      <Link href={`/burn-carbon-credit/${nftId}`}>
        <a>
          <Button w="100%" mt="2">
            Burn Carbon Credit
          </Button>
        </a>
      </Link>
    </Card>
  );
};

export default MintedNFTCard;
