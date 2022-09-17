import { useState } from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import Calendar, { CalendarTileProperties, FormatterCallback } from 'react-calendar';
import { get } from 'lodash';

const icons = {
  2: '/images/calendar/monkey.png',
  11: '/images/calendar/sunflower.png',
  15: '/images/calendar/sloth.png',
  24: '/images/calendar/butterfly.png',
  27: '/images/calendar/moon-face.png',
};

const getIcon = (date: Date) => {
  const day = date.getDate();
  return get(icons, day, '');
};

const TileContent = ({ date, view }: CalendarTileProperties) => {
  const day = date.getDate();

  if (view === 'month') {
    const icon = getIcon(date);
    if (icon) {
      return <Image src={icon} alt={day.toString()} margin="0 auto" />;
    }
  }
  return <></>;
};

const dayFormatter: FormatterCallback = (locale, date) => {
  const icon = getIcon(date);
  if (icon) {
    return '';
  }
  return date.getDate().toString();
};

const UserCalendar = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Box>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={TileContent}
        formatDay={dayFormatter}
      />
      <Text mt={3}>User: 2g7j...ds3f</Text>
    </Box>
  );
};

export default UserCalendar;
