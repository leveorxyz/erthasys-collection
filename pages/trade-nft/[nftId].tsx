import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import { Box, Flex, Image, Heading, Text, useBoolean } from '@chakra-ui/react';
import Card from '../../components/Card/Card';
import TradeWithCard from '../../components/Card/TradeWithCard';
import SliderPlaceholder from '../../components/Placeholder/SliderPlaceholder';
import SiteTitle from '../../components/SiteTitle/SiteTitle';
import SlickSlider from '../../components/SlickSlider/SlickSlider';
import SliderContainer from '../../components/SliderContainer/SliderContainer';
import Loading from '../../components/Loading/Loading';
import fpContract from '../../config/fpContract';
import { NFTType } from '../../interfaces';
import { getFormattedDate } from '../../utils/helpers';

const TradeNFT: NextPage = () => {
  const [isLoading, setIsLoading] = useBoolean();
  const [nft, setNft] = useState<NFTType>();
  const [mintedNFTs, setMintedNFTs] = useState<NFTType[]>([]);
  const [isMintedLoading, setIsMintedLoading] = useState(false);
  const { address } = useContractKit();
  const router = useRouter();
  const { nftId } = router.query;

  const fetchMintedNFTs = async () => {
    try {
      setIsMintedLoading(true);
      // get all user addresses
      const userAddresses = await fpContract.methods.getAllUserExceptGivenUser(address).call();
      for (let i = 0; i < userAddresses.length; i++) {
        const userAddress = userAddresses[i];
        const userNfts = await fpContract.methods.getMintedNftListOfSingleUser(address).call();
        const userNftObjects = userNfts.map((item: string[]) => {
          const tempObj: any = Object.assign({}, item);
          tempObj.owner = userAddress;
          return tempObj;
        });
        setMintedNFTs((prev) => [...prev, ...userNftObjects]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsMintedLoading(false);
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

  useEffect(() => {
    fetchNftDetails();
    fetchMintedNFTs();
    // eslint-disable-next-line
  }, [nftId]);

  if (isLoading) return <Loading />;

  return (
    <Box className="container" mt={10}>
      <SiteTitle title="Trade NFT" />
      <Flex mb={20} wrap="wrap">
        <Card height="100%" width="auto">
          <Image
            src={nft?.uri}
            alt={nft?.name}
            width="290px"
            height="300px"
            borderTopRightRadius={20}
          />
        </Card>
        <Box ml={10} mt={10}>
          <Heading size="md">Trade</Heading>
          <Text my={3}>{nft?.name}</Text>
          <Text fontSize="sm">Minted Date: {getFormattedDate(nft?.mintingDate)}</Text>
          <Text fontSize="sm">Expiry Date: {getFormattedDate(nft?.expirationDate)}</Text>
        </Box>
      </Flex>
      {/* Trade */}
      <SliderContainer title="Trade With">
        {isMintedLoading ? (
          <SliderPlaceholder width="235px" height="350px" numCards={5} />
        ) : (
          <SlickSlider slideToShow={mintedNFTs.length < 5 ? mintedNFTs.length : 5}>
            {mintedNFTs.map((item) => (
              <TradeWithCard
                key={item.nftID}
                nftId={item.nftID}
                holdingNftId={nft?.nftID}
                owner={item.owner}
                title={item.name}
                thumbnail={item.uri}
                expiryDate={item.expirationDate}
              />
            ))}
          </SlickSlider>
        )}
      </SliderContainer>
    </Box>
  );
};

export default TradeNFT;
