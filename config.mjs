/* eslint-disable quote-props */

// The name of your Day Type input select to be created in home assistant
export const dayTypeSelectName = 'Day Type';

// The name of your State input select to be created in home assistant
export const stateSelectName = 'Home State';

// Create a map of your homes states to the scripts that should be run
const homeStateMap = {
  'Morning': { script: 'morning' },
  'Mid-morning': { script: 'home_state_midmorning' },
  'Day': { script: 'home_state_day' },
  'Lunch': { script: 'home_state_lunch' },
  'Afternoon': { script: 'home_state_afternoon' },
  'Early Evening': { script: 'home_state_early_evening' },
  'Late Evening': { script: 'home_state_late_evening' },
  'Dinner': { script: 'home_state_dinner' },
  'Dishes': { script: 'home_state_dishes' },
  'Get Ready For Bed': { script: 'home_state_get_ready_for_bed' },
  'Go to Sleep': { script: 'home_state_go_to_sleep' },
  'Sleeping': { script: 'home_state_sleeping' },
};

// Custom Trigger
const earlyEveningTrigger = {
  platform: 'numeric_state',
  id: 'early_evening',
  entity_id: 'sun.sun',
  attribute: 'elevation',
  below: 'input_number.angle_of_sun_early_evening',
  triggerId: 'angle_of_sun_early_evening',
};

// These are state that are triggered by buttons
const sharedStates = {
  'Dinner': { trigger: null },
  'Dishes': { trigger: null },
  'Get Ready For Bed': { trigger: null },
  'Go to Sleep': { trigger: null },
  'Sleeping': { trigger: null },
};

// A map of the day types with each state of the day mapped to the trigger
// of when to change to specifyed state
export const dayTypeConfig = {
  'Work': {
    ...sharedStates,
    'Morning': { trigger: 'input_datetime.workday_morning' },
    'Mid-morning': { trigger: '09:30:00' },
    'Lunch': { trigger: 'input_datetime.workday_lunch' },
    'Afternoon': { trigger: 'input_datetime.workday_afternoon' },
    'Early Evening': { trigger: earlyEveningTrigger },
    'Late Evening': { trigger: '20:30:00' },
  },
  'Non Work': {
    ...sharedStates,
    'Morning': { trigger: 'input_datetime.non_workday' },
    'Day': { trigger: '09:30:00' },
    'Early Evening': { trigger: earlyEveningTrigger },
    'Late Evening': { trigger: '20:30:00' },
  },
  'Ski/Hike': {
    ...sharedStates,
    'Morning': { trigger: 'input_datetime.early_morning' },
    'Day': { trigger: '09:30:00' },
    'Early Evening': { trigger: earlyEveningTrigger },
    'Late Evening': { trigger: '20:30:00' },
  },
  'House Sitter': {
    ...sharedStates,
    'Morning': { trigger: 'input_datetime.non_workday' },
    'Day': { trigger: '09:30:00' },
    'Early Evening': { trigger: earlyEveningTrigger },
    'Late Evening': { trigger: '20:30:00' },
    'Go to Sleep': { trigger: '00:45:00' },
  },
  'Vacation': {
    ...sharedStates,
    'Morning': { trigger: 'input_datetime.non_workday' },
    'Day': { trigger: '09:30:00' },
    'Early Evening': { trigger: earlyEveningTrigger },
    'Late Evening': { trigger: '20:30:00' },
    'Go to Sleep': { trigger: '22:45' },
  },
};

export default {
  dayTypeSelectName,
  stateSelectName,
  homeStateMap,
  dayTypeConfig,
};
