//environment.js
import Constants from 'expo-constants';
var environments = {
    staging: {
      FIREBASE_API_KEY: 'AIzaSyDXHhRV8wWTwia872xU4GocI-lwxWtjw_Y',
      FIREBASE_AUTH_DOMAIN: 'virtual-pet-fdc45.firebaseapp.com',
      FIREBASE_DATABASE_URL: 'https://virtual-pet-fdc45.firebaseio.com',
      FIREBASE_PROJECT_ID: 'virtual-pet-fdc45',
      FIREBASE_STORAGE_BUCKET: 'virtual-pet-fdc45.appspot.com',
      FIREBASE_MESSAGING_SENDER_ID: '1022588225452',
      GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyCfGVft8N5moal_Nfn0ygHLVFJWJLyu5xk'
    },
    production: {
      // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
  };
  
  function getReleaseChannel() {
    let releaseChannel = Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) {
      return 'staging';
    } else if (releaseChannel === 'staging') {
      return 'staging';
    } else {
      return 'staging';
    }
  }
  function getEnvironment(env) {
    console.log('Release Channel: ', getReleaseChannel());
    return environments[env];
  }
  var Environment = getEnvironment(getReleaseChannel());
  export default Environment;