import Head from 'next/head';

const SiteTitle = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>ProjectX || {title}</title>
    </Head>
  );
};

export default SiteTitle;
