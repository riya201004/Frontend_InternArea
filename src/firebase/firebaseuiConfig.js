// firebaseuiConfig.js

import { auth } from './firebase';
import * as firebaseui from 'firebaseui';
import { GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth'


const uiConfig = {
    signInSuccessUrl: '/',
    signInFlow: 'popup', // Set the sign-in flow to 'popup'
    signInOptions: [
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        scopes: ['https://www.googleapis.com/auth/plus.login'],
        customParameters: {
          prompt: 'select_account' // Forces account selection even when one account is available
        }
      },
      EmailAuthProvider.PROVIDER_ID
      // Add other sign-in options as needed
    ],
    // Other FirebaseUI config options
  };

  // Singleton instance for AuthUI
let uiInstance;

export const initializeFirebaseUI = () => {
  if (!uiInstance) {
    uiInstance = new firebaseui.auth.AuthUI(auth);
  }
  uiInstance.start('#firebaseui-auth-container', uiConfig);
};

export { uiConfig };

// export default {uiConfig};
