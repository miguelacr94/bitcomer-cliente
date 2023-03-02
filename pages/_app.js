import '../styles/globals.css'
import Head from 'next/head'
import Provider from '../provider/user'
import { ToastProvider } from "react-toast-notifications";
import 'react-responsive-modal/styles.css';
import Tracker from '../provider/Tracker';






function MyApp({ Component, pageProps }) {



  return (
    <>
      <Provider>
        <Head>
          <title>Bitcomer</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="../image/BITCOMER_AZUL.svg" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
          <script id="metamap" type="text/javascript" src="https://web-button.getmati.com/button.js" strategy="beforeInteractive" defer={false}></script>
          <meta name="facebook-domain-verification" content="1sczfkx9gspknh1scdhjmnf7o2g8tv" />
        </Head>

<Tracker/>

        <div className="h-windows flex w-full ">
          {/* <Menu /> */}
          <ToastProvider autoDismiss={true} newestOnTop={true}>
            <Component {...pageProps} />
          </ToastProvider>

        </div>




      </Provider>

    </>

  )
}

export default MyApp
