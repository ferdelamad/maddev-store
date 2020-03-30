import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from '../lib/apolloClient';
import App from 'next/app'

import Page from '../components/Page';

//TODO refactor to add typescript
type Props = AppProps & any

const MyApp = ({ Component, pageProps, apollo }: Props) => {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
}

export default withApollo(MyApp);
