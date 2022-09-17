import type { NextPage } from 'next';
import { ChangeEventHandler, useRef, useState, useMemo } from 'react';
import { Box, Button, Flex, Heading, Text, SimpleGrid, Input, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { create } from 'ipfs-http-client';
import SiteTitle from '../../../components/SiteTitle/SiteTitle';
import NewNFTCard from '../../../components/Card/NewNFTCard';
import { getBase64 } from '../../../utils/helpers';
import { FormDataType, inputNFTType } from '../../../interfaces';

const LoadNFTs: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<inputNFTType[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  // @ts-ignore
  const client = create('https://ipfs.infura.io:5001/api/v0');
  const toast = useToast();

  const handleUploadClick = () => {
    fileInputRef?.current?.click();
    setSelectedFiles([]);
  };

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = Array.from(e.target.files || []);

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const imageURL: string = await getBase64(file);
      setSelectedFiles((prev) => [
        ...prev,
        { id: i, name: file.name, image: imageURL, file: file },
      ]);
    }
  };

  const handleFormSubmit = async (data: FormDataType) => {
    setIsLoading(true);

    for (let i = 0; i < data.images.length; i++) {
      const added = await client.add(selectedFiles[i].file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      const name = data.images[i].name;
      const reward = data.images[i].reward;
    }
    setSelectedFiles([]);
    setIsLoading(false);
    toast({ title: 'Success', description: 'NFTs Loaded Successfully', status: 'success' });
  };

  const isSelected = useMemo(() => selectedFiles.length > 0, [selectedFiles]);

  return (
    <>
      <Box className="container" mt={15}>
        <SiteTitle title="Load NFTs" />
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Heading size="md">Load New NFTs</Heading>
            <Text mt={3}>Total Users: 326</Text>
          </Box>
          <Box>
            <Button onClick={handleUploadClick}>Upload Files</Button>
            <Input
              onChange={handleFileInput}
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple={true}
              hidden
            />
          </Box>
        </Flex>
      </Box>
      {isSelected ? (
        <>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box bg="gradient.slider" mt={10}>
              <Box className="container" py={5}>
                <SimpleGrid columns={[1, 2]} gap={'15rem'} rowGap={5}>
                  {selectedFiles.map((image) => (
                    <NewNFTCard
                      key={image.id}
                      id={image.id}
                      title={`${image.id + 1}. ${image.name}`}
                      thumbnail={image.image}
                      register={register}
                      errors={errors}
                    />
                  ))}
                </SimpleGrid>
              </Box>
            </Box>

            <Box className="container">
              <Flex justifyContent="flex-end">
                <Button mt={5} type="submit" isLoading={isLoading}>
                  Load NFTs
                </Button>
              </Flex>
            </Box>
          </form>
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center" h="50vh">
          <Text fontSize="2xl">List is empty! Click Upload Files button to add</Text>
        </Flex>
      )}
    </>
  );
};

export default LoadNFTs;
