import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        color: '#fff',
        background: '#01204C',
        backgroundImage:
          'url("/images/bg-image.png"),\
          linear-gradient(113.49deg, rgba(152, 77, 56, 0.5) -30.3%, rgba(108, 71, 218, 0.5) -30.28%, rgba(1, 32, 76, 0.5) 89.92%)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      },
    },
  },
  colors: {
    brand: {
      100: '#2CA0E2',
    },
    gray: {
      100: '#eff3fa',
    },
    blue: {
      100: '#01204C',
    },
    red: {
      100: '#D9424B',
    },
    green: {
      100: '#1AE49B',
    },
    gradient: {
      slider: 'linear-gradient(90.01deg, rgba(12, 36, 90, 0.4) 22.08%, rgba(9, 35, 87, 0) 99.32%)',
      nftcard:
        'linear-gradient(90deg, rgba(255, 255, 255, 0.1) -1.52%, rgba(255, 255, 255, 0.024) 104.35%)',
      nftcardHover:
        'linear-gradient(90deg, rgba(255, 255, 255, 0.2) -1.52%, rgba(255, 255, 255, 0.06) 104.35%)',
      inputBg:
        'linear-gradient(90deg, rgba(255, 255, 255, 0.1) -3.84%, rgba(255, 255, 255, 0.024) 133.08%)',
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
          background: 'brand.100',
          border: '1px solid',
          borderColor: 'brand.100',
          _hover: {
            backgroundColor: 'brand.100',
            border: '1px solid white',
            _disabled: {
              background: 'brand.100',
            },
          },
          _active: {
            background: 'brand.100',
          },
        },
        link: {
          _active: {
            color: 'white',
          },
        },
      },
    },
  },
});

export default customTheme;
