import type { NextPage } from 'next';
import { Box, Heading, Text } from '@chakra-ui/react';
import SiteTitle from '../../components/SiteTitle/SiteTitle';
import SliderContainer from '../../components/SliderContainer/SliderContainer';
import SlickSlider from '../../components/SlickSlider/SlickSlider';
import Card from '../../components/Card/Card';
import UserCalendar from '../../components/UserCalendar/UserCalendar';

const AdminHome: NextPage = () => {
  return (
    <Box className="container" mt={15}>
      <SiteTitle title="Admin Home" />
      <Box>
        <Heading size="md">Welcome to Admin Panel</Heading>
        <Text mt={3}>Total Users: 326</Text>
      </Box>

      {/* Users */}
      <SliderContainer title="Users">
        {/* <SliderPlaceholder numCards={3} /> */}
        <SlickSlider slideToShow={3}>
          {Array.from({ length: 6 }, (v, i) => i).map((item) => (
            <Box key={item} px="3" width="100%">
              <Card width="325px">
                <UserCalendar />
              </Card>
            </Box>
          ))}
        </SlickSlider>
      </SliderContainer>
    </Box>
  );
};

export default AdminHome;
