import 'dotenv/config';

export default {
  expo: {
    name: 'ModuloUsuariosRespirAR-Mobile',
    slug: 'ModuloUsuariosRespirAR-Mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './src/assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      favicon: './src/assets/favicon.png'
    },
    extra: {
      backendUrl: process.env.BACKEND_URL
    }
  }
};
