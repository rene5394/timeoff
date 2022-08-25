import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.css';
import type { AppProps } from 'next/app';
import { useEffect } from "react";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    import('bootstrap/dist/js/bootstrap.js');
  },[])
  return <Component {...pageProps} />
}

export default MyApp
