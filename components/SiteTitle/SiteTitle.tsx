import Head from 'next/head';

const SiteTitle = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>Erthasys Collection || {title}</title>
    </Head>
  );
};

export default SiteTitle;
