import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        color: '#1C3238',
        background:
          'linear-gradient(90deg,rgba(53, 103, 95, 0.2) -1.52%, rgba(28, 50, 56, 0.06) 104.35%)',
      },
    },
  },
  colors: {
    brand: {
      50: '#35675fb3',
      100: '#35675F',
    },
    red: {
      100: '#D9424B',
    },
    darkGreen: {
      100: '#1C3238',
    },
    green: {
      100: '#ACD113',
    },

    gradient: {
      slider: 'linear-gradient(90.01deg, rgba(28,50,56,0.3) 22.08%, rgba(53,103,95,0) 99.32%)',
      inputBg: 'linear-gradient(90deg, rgba(53,103,95,0.1) -3.84%, rgba(28,50,56,0.024) 133.08%)',
    },
  },

  fonts: {
    body: 'Roboto Mono',
    heading: 'Roboto Mono',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  components: {
    Button: {
      variants: {
        solid: {
          borderRadius: 0,
          borderTopLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          color: 'darkGreen.100',
          background: 'green.100',
          border: '1px solid',
          borderColor: 'green.100',
          _hover: {
            backgroundColor: 'green.100',
            border: '1px solid green',
            _disabled: {
              background: 'green.100',
            },
          },
          _active: {
            background: 'green.100',
          },
        },
        link: {
          color: 'white',
          _active: {
            color: 'darkGreen.100',
          },
        },
      },
    },
  },
});

export default customTheme;
