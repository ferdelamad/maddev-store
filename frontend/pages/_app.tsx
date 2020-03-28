import { Container, AppProps } from 'next/app';
import Page from '../components/Page';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Container>
      <Page>
        <Component {...pageProps} />
      </Page>
    </Container>
  );
}

export default MyApp;
