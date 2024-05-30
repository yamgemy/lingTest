/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';

import { MyThemeProvider } from '@src/components';
import { colors } from '@src/constants';
import { SearchBananaOwnersScreen } from '@src/screens/search-banana-owners-screen';
import { ActivityIndicator } from 'react-native-paper';
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

  return (
    <View style={styles.fullDeviceBase}>
      <SafeAreaView style={styles.safeAreaRoot}>
        {configuredStore? (
          <Provider store={configuredStore.store}>
            <PersistGate
                loading={null}
                persistor={configuredStore.persistor}
            >
              <MyThemeProvider>
                <>
                  <SearchBananaOwnersScreen/>
                </>
              </MyThemeProvider>
            </PersistGate>
          </Provider>
        ): (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size={'large'} 
                animating={true} 
                //this is not themed..and theme requires reading redux store.. 
                color={colors.red_700}/>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullDeviceBase: {
    flex:1,
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
