import {
  Box,
  Image,
  Text,
  InputGroup,
  InputRightElement,
  Icon,
  Input,
  Flex,
} from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { IoDocumentTextOutline, IoGiftOutline } from 'react-icons/io5';
import { get } from 'lodash';
import Card from './Card';
import { FormDataType, NFTInputErrorsType } from '../../interfaces';

type PropTypes = {
  thumbnail?: string;
  title: string;
  id: number;
  register: UseFormRegister<FormDataType>;
  errors: NFTInputErrorsType;
};

const NewNFTCard = ({ id, thumbnail, title, register, errors }: PropTypes) => {
  return (
    <Card width="100%" height="auto">
      <Flex justifyContent="space-between">
        <Box pr={3}>
          <Text fontWeight="bold" my="2" fontSize="16px" textTransform="capitalize">
            {title}
          </Text>

          <InputGroup mt={5}>
            <InputRightElement pointerEvents="none">
              <Icon as={IoDocumentTextOutline} fontWeight="bold" />
            </InputRightElement>
            <Input
              type="text"
              placeholder="Name"
              background="gradient.inputBg"
              backdropFilter="blur(40.1868px)"
              borderTopRightRadius="20px"
              borderBottomLeftRadius="20px"
              borderColor="whiteAlpha.400"
              {...register(`images.${id}.name`, { required: true })}
              isInvalid={get(errors, `images.${id}.name`, false)}
            />
          </InputGroup>
          <InputGroup mt={5}>
            <InputRightElement pointerEvents="none">
              <Icon as={IoGiftOutline} fontWeight="bold" />
            </InputRightElement>
            <Input
              placeholder="Reward"
              background="gradient.inputBg"
              backdropFilter="blur(40.1868px)"
              borderTopRightRadius="20px"
              borderBottomLeftRadius="20px"
              borderColor="whiteAlpha.400"
              {...register(`images.${id}.reward`, { required: true })}
              isInvalid={get(errors, `images.${id}.reward`, false)}
            />
          </InputGroup>
        </Box>
        <Box>
          <Image
            src={thumbnail || '/images/bored-ape.png'}
            alt="NFT"
            width="200px"
            height="200px"
            borderTopRightRadius={20}
          />
        </Box>
      </Flex>
    </Card>
  );
};

export default NewNFTCard;
