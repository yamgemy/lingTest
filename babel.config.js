module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx'],
        alias: {
          '@src': './src',
          '@api': './src/api',
          '@assets': './src/assets',
          '@actions': './src/actions',
          '@components': './src/components',
          '@constants': './src/constants',
          '@helpers': './src/helpers',
          '@hooks': './src/hooks',
          '@navigators': './src/navigators',
          '@reducers': './src/reducers',
          '@sagas': './src/sagas',
          '@screens': './src/screens',
          '@selectors': './src/selectors',
          '@services': './src/services',
          '@store': './src/store',
          '@typings': './src/typings',
          '@animations': './src/animations',
          '@types': './src/types',
          '@utils': './src/utils',
          '@dto': './src/dto',
          '@contexts': './src/contexts',
          '@mockdata': './src/mockdata'
        },
      },
    ],
  ],
};
