import 'bootstrap/dist/css/bootstrap.css'
import '../styles/bootswatch.css'
import '../styles/global.css'
import React from 'react';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

const store = createStore({
  authType: 'cookie',
  authName: '_auth',
  cookieDomain: 'localhost',
  cookieSecure: false
});



function MyApp({ Component, pageProps }) {
  return <AuthProvider
    store={store}
  >
    <Component {...pageProps} />
  </AuthProvider >
}

export default MyApp
