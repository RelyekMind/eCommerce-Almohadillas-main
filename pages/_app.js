import '../styles/globals.css';
import '../styles/productDetail.css';

import Header from '../components/Header';
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
