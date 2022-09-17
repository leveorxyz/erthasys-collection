import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@celo-tools/use-contractkit/lib/styles.css';
import 'nprogress/nprogress.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import { ContractKitProvider, Alfajores, NetworkNames } from '@celo-tools/use-contractkit';
import NProgress from 'nprogress';
import theme from '../theme';
import Layout from '../components/Layout/Layout';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ContractKitProvider
        networks={[Alfajores]}
        network={{
          name: NetworkNames.Alfajores,
          rpcUrl: 'https://alfajores-forno.celo-testnet.org',
          graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
          explorer: 'https://alfajores-blockscout.celo-testnet.org',
          chainId: 44787,
        }}
        dapp={{
          name: 'ProjectX',
          description: 'ProjectX',
          url: '',
          icon: '',
        }}
      >
        <Head>
          <title>ProjectX</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContractKitProvider>
    </ChakraProvider>
  );
}

export default MyApp;
