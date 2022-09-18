import { FieldError } from 'react-hook-form';

export type FormDataType = {
  images: { name: string; reward: string; imageUrl?: string }[];
};

export type inputNFTType = {
  id: number;
  name: string;
  image: string;
  file: File;
};

export type NFTInputErrorsType = {
  images?:
    | {
        name?: FieldError | undefined;
        reward?: FieldError | undefined;
        imageUrl?: FieldError | undefined;
      }[]
    | undefined;
};

export type NFTType = {
  claimableDate: string;
  expirationDate: string;
  mintingDate: string;
  name: string;
  nftID: string;
  reward: string;
  uri: string;
  owner?: string;
};

export type TradeNFTType = {
  myNftExpirationDate: string;
  myNftId: string;
  myNftName: string;
  myNftURI: string;
  requestedNftExpirationDate: string;
  requestedNftId: string;
  requestedNftName: string;
  requestedNftOwner: string;
  requestedNftURI: string;
};
