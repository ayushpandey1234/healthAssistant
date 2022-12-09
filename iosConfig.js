import AppleHealthKit from 'react-native-health';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.Workout,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
      AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
      AppleHealthKit.Constants.Permissions.BodyTemperature,
      AppleHealthKit.Constants.Permissions.BloodGlucose,
    ],
  },
};

AppleHealthKit.initHealthKit(permissions, error => {
  if (error) {
    console.log('[ERROR] Cannot grant permissions!');
  }
});

function averageValueOfResults(results) {
  let totalValue = 0;
  let countOfValues = 0;
  results.forEach(result => {
    totalValue += result.value;
  });
  return Math.round(totalValue / countOfValues);
}

function averageValueOfBloodPressureResults(results) {
  let totalSystolicValue = 0;
  let totalDiastolicValue = 0;
  let countOfValues = 0;
  results.forEach(result => {
    totalSystolicValue += result.bloodPressureSystolicValue;
    totalDiastolicValue += result.bloodPressureDiastolicValue;
  });
  return (
    Math.round(totalSystolicValue / countOfValues),
    Math.round(totalDiastolicValue / countOfValues)
  );
}

function getMinutesDifferenceBetweenTwoDates(startDate, endDate) {
  return Math.round((endDate.getTime() - startDate.getTime()) / 60000);
}

function aggregateCaloriesFromSamples(results) {
  let totalCalories = 0;
  results.forEach(result => {
    totalCalories += result.calories;
  });
  return totalCalories;
}

function aggregateMoveMinutesFromSamples(results) {
  let totalMoveMinutes = 0;
  results.forEach(result => {
    totalMoveMinutes += getMinutesDifferenceBetweenTwoDates(
      result.start,
      result.end,
    );
  });
  return totalMoveMinutes;
}

const optionsWithStartDate = {
  startDate: new Date(2022, 12, 9).toISOString(),
};

AppleHealthKit.getStepCount(optionsWithStartDate, (err, results) => {
  if (err) {
    return;
  }
  console.log('Total Steps: ' + results.value);
});

AppleHealthKit.getActiveEnergyBurned(optionsWithStartDate, (err, results) => {
  if (err) {
    return;
  }
  console.log('Total Active Energy Burned: ' + results.value);
});

AppleHealthKit.getSamples(optionsWithStartDate, (err, results) => {
  if (err) {
    return;
  }
  console.log('Total Calories: ' + aggregateCaloriesFromSamples(results));
  console.log('Total Move Minutes:' + aggregateMoveMinutesFromSamples(results));
});

AppleHealthKit.getBodyTemperatureSamples(
  optionsWithStartDate,
  (err, results) => {
    if (err) {
      return;
    }
    console.log('Average Body Temperature: ' + averageValueOfResults(results));
  },
);

AppleHealthKit.getHeartRateSamples(optionsWithStartDate, (err, results) => {
  if (err) {
    return;
  }
  console.log('Average Heart Rate: ' + averageValueOfResults(results));
});

AppleHealthKit.getBloodPressureSamples(optionsWithStartDate, (err, results) => {
  if (err) {
    return;
  }
  let [averageSystolicValue, averageDiastolicValue] =
    averageValueOfBloodPressureResults(results);
  console.log(
    'Average Blood Pressure Value (Systolic/Diastolic): ' +
      averageSystolicValue +
      '/' +
      averageDiastolicValue,
  );
});

AppleHealthKit.getBloodGlucoseSamples(optionsWithStartDate, (err, results) => {
  if (err) {
    return;
  }
  console.log('Average Blood Glucose: ' + averageValueOfResults(results));
});
