/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { MyStatusBar, MyThemeProvider } from '@src/components';
import { colors } from '@src/constants';
import { SearchBananaOwnersScreen } from '@src/screens/search-banana-owners-screen';
import { ActivityIndicator, MD3Theme, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from './src/store/configure-store';

function App(): JSX.Element {

  const [configuredStore, setConfiguredStore] = useState<ReturnType<typeof configureStore>>();

  useEffect(()=>{
    if (!configuredStore) {
      const configedStoreResult = configureStore();
      setConfiguredStore(configedStoreResult); //put in useEffect so it only run ONCE
    }
  }, [configuredStore]);

  const theme = useTheme();
  const appStyles = styles(theme);

  return (
    <View style={[appStyles.fullDeviceBase]}>

      {configuredStore? (
        <Provider store={configuredStore.store}>
          <PersistGate
              loading={null}
              persistor={configuredStore.persistor}
            >
            <MyThemeProvider>
              <>
                <MyStatusBar/>
                {/*'top' is omitted from SafeAreaView because MyStatusbar occupies it's own height*/}
                <SafeAreaView style={appStyles.safeAreaRoot} edges={['bottom', 'left', 'right']}>
                  <SearchBananaOwnersScreen/>
                </SafeAreaView>
              </>
            </MyThemeProvider>
          </PersistGate>
        </Provider>
        ): (
          <View style={appStyles.activityIndicatorContainer}>
            <ActivityIndicator size={'large'} 
                animating={true} 
                //this is not themed..and theme requires reading redux store.. 
                color={colors.red_700}/>
          </View>
        )}
    </View>
  );
}

const styles = (theme: MD3Theme) => StyleSheet.create({
  fullDeviceBase: {
    flex:1,
    backgroundColor:  theme.colors.background
  },
  safeAreaRoot:{
    flex:1,
  },
  activityIndicatorContainer: {
    flex:1,
    justifyContent:'center',
    alignContent:'center'
  }
});

export default App;
