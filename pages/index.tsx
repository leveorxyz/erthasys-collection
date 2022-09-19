import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useContractKit } from '@celo-tools/use-contractkit';
import MintedNFTCard from '../components/Card/MintedNFTCard';
import NftCard from '../components/Card/NFTCard';
import TradeNFTCard from '../components/Card/TradeNFTCard';
import SliderPlaceholder from '../components/Placeholder/SliderPlaceholder';
import SiteTitle from '../components/SiteTitle/SiteTitle';
import SlickSlider from '../components/SlickSlider/SlickSlider';
import SliderContainer from '../components/SliderContainer/SliderContainer';
import ConnectWallet from '../components/ConnectWallet/ConnectWallet';
import UserOnboard from '../components/UserOnboard/UserOnboard';
import fpContract from '../config/fpContract';
import Loading from '../components/Loading/Loading';
import { NFTType, TradeNFTType } from '../interfaces';

const Home: NextPage = () => {
  const [claimableNFTs, setClaimableNFTs] = useState<NFTType[]>([]);
  const [isClaimableLoading, setIsClaimableLoading] = useState(false);
  const [mintedNFTs, setMintedNFTs] = useState<NFTType[]>([]);
  const [isMintedLoading, setIsMintedLoading] = useState(false);
  const [tradeRequests, setTradeRequests] = useState<TradeNFTType[]>([]);
  const [isTradeLoading, setIsTradeLoading] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isOnboardedLoading, setIsOnboardedLoading] = useState(false);
  const { address } = useContractKit();

  const checkOnboarded = async () => {
    if (!address) return false;
    setIsOnboardedLoading(true);
    const res = await fpContract.methods
      .checkUserOnboard(address)
      .call()
      .catch((err: any) => console.log(err));
    setIsOnboardedLoading(false);
    setIsOnboarded(res);
  };

  const fetchClaimableNFTs = async () => {
    try {
      setIsClaimableLoading(true);
      const res = await fpContract.methods.getClaimableNfts(address).call();
      setClaimableNFTs(() => res.map((item: string[]) => Object.assign({}, item)));
    } catch (error) {
      console.log(error);
    } finally {
      setIsClaimableLoading(false);
    }
  };

  const fetchMintedNFTs = async () => {
    try {
      setIsMintedLoading(true);
      const res = await fpContract.methods.getMintedNftListOfSingleUser(address).call();
      setMintedNFTs(() => res.map((item: string[]) => Object.assign({}, item)));
    } catch (error) {
      console.log(error);
    } finally {
      setIsMintedLoading(false);
    }
  };

  const fetchTradeRequests = async () => {
    try {
      setIsTradeLoading(true);
      const res = await fpContract.methods.getTradeRequestListofSingleUser(address).call();
      setTradeRequests(() => res.map((item: string[]) => Object.assign({}, item)));
    } catch (error) {
    } finally {
      setIsTradeLoading(false);
    }
  };

  const refetchData = () => {
    fetchClaimableNFTs();
    fetchMintedNFTs();
    fetchTradeRequests();
  };

  useEffect(() => {
    checkOnboarded();
    fetchClaimableNFTs();
    fetchMintedNFTs();
    fetchTradeRequests();
    // eslint-disable-next-line
  }, [address, isOnboarded]);

  if (!address) return <ConnectWallet />;
  if (isOnboardedLoading) return <Loading />;
  if (!isOnboarded) return <UserOnboard setIsOnboarded={setIsOnboarded} />;

  return (
    <Box>
      <SiteTitle title="Home" />

      {/* Claimable NFTS */}
      {claimableNFTs.length > 0 && (
        <SliderContainer title="NFTs for Sale">
          {isClaimableLoading ? (
            <SliderPlaceholder width="235px" height="309px" />
          ) : (
            <SlickSlider slideToShow={claimableNFTs.length < 5 ? claimableNFTs.length : 5}>
              <NftCard
                nftId="10"
                title="Earth"
                thumbnail="https://www.billboard.com/wp-content/uploads/media/05-lil-dicky-earth-MV-2019-billboard-1548.jpg"
                claimableDate="1663489923"
                refetchData={refetchData}
              />
              {claimableNFTs.map((item) => (
                <NftCard
                  key={item.nftID}
                  title={item.name}
                  nftId={item.nftID}
                  thumbnail={item.uri}
                  claimableDate={item.claimableDate}
                  refetchData={refetchData}
                />
              ))}
            </SlickSlider>
          )}
        </SliderContainer>
      )}

      {/* Minted NFTS */}
      {mintedNFTs.length > 0 && (
        <SliderContainer title="My NFTs">
          {isMintedLoading ? (
            <SliderPlaceholder width="235px" height="453px" numCards={5} />
          ) : (
            <SlickSlider slideToShow={mintedNFTs.length < 5 ? mintedNFTs.length : 5}>
              {mintedNFTs.map((item) => (
                <MintedNFTCard
                  key={item.nftID}
                  nftId={item.nftID}
                  title={item.name}
                  thumbnail={item.uri}
                  reward={item.reward}
                  mintingDate={item.mintingDate}
                  expiryDate={item.expirationDate}
                />
              ))}
            </SlickSlider>
          )}
        </SliderContainer>
      )}

      {/* Trade Request */}
      {tradeRequests.length > 0 && (
        <SliderContainer title="Trade Request">
          {isTradeLoading ? (
            <SliderPlaceholder width="490px" height="360px" numCards={2} />
          ) : (
            <SlickSlider slideToShow={tradeRequests.length < 2 ? tradeRequests.length : 2}>
              {tradeRequests.map((item) => (
                <TradeNFTCard
                  nft={item}
                  width={'490px'}
                  key={item.myNftId}
                  refetchData={refetchData}
                />
              ))}
            </SlickSlider>
          )}
        </SliderContainer>
      )}
    </Box>
  );
};

export default Home;
