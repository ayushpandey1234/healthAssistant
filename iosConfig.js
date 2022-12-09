// iOS
import AppleHealthKit from 'react-native-health';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.Workout,
    ],
  },
};

AppleHealthKit.initHealthKit(permissions, error => {
  if (error) {
    console.log('[ERROR] Cannot grant permissions!');
  }
});

const appleHealthKitOptions = {
  startDate: new Date().toISOString(),
};

AppleHealthKit.getStepCount(appleHealthKitOptions, (err, results) => {
  if (err) {
    return;
  }
  console.log(results);
});

AppleHealthKit.getActiveEnergyBurned(appleHealthKitOptions, (err, results) => {
  if (err) {
    return;
  }
  console.log(results);
});
