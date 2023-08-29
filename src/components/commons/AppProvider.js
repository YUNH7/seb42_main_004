import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store, persistor } from '../../global/store';

function AppProvider({ children }) {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <BrowserRouter>{children}</BrowserRouter>
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
}

export default AppProvider;
