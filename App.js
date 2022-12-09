/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';

const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
  ],
};


const Button = ({label, onPress})=>{
  return <TouchableOpacity onPress={onPress} style={{padding: 12, borderRadius: 8, backgroundColor: 'black'}} >
    <Text style={{color: 'white', textAlign: 'center'}} >{label}</Text>
  </TouchableOpacity>
}


GoogleFit.openFit()
// GoogleFit.isAvailable((cal)=>{
//   console.log('@@@@@@@@@@@@cal', cal)
// })

const dispatch = (...params)=>{
  console.log(...params)
}

const App = () => {

  useEffect(() => {
    GoogleFit.checkIsAuthorized().then(() => {
      console.log(GoogleFit.isAuthorized); // Then you can simply refer to `GoogleFit.isAuthorized` boolean.

      if (!GoogleFit.isAuthorized) {
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              dispatch('AUTH_SUCCESS');
            } else {
              dispatch('AUTH_DENIED', authResult.message);
            }
          })
          .catch(() => {
            dispatch('AUTH_ERROR');
          });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text>Header</Text>
      </View>
      <View style={styles.body}>
        <Text>Body</Text>
        <Button label='Check steps' onPress={()=>{
          const opt = {
            startDate: "2017-01-01T00:00:17.971Z", // required ISO8601Timestamp
            endDate: new Date().toISOString(), // required ISO8601Timestamp
            // bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
            bucketInterval: 1, // optional - default 1. 
          };
          GoogleFit.getDailyStepCountSamples(opt)
          .then((res) => {
              console.log('Daily steps >>> ', res)
          })
          .catch((err) => {console.warn(err)});
        }} />
      </View>
      <View>
        <Text>Footer</Text>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  body: {
    flex: 1,
    backgroundColor: 'green',
  },
});
