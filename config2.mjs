/* eslint-disable quote-props */

// The name of your Day Type input select to be created in home assistant
export const dayTypeSelectName = 'Day Type';

// The name of your State input select to be created in home assistant
export const stateSelectName = 'Upstairs State';

// Create a map of your homes states to the scripts that should be run
const homeStateMap = {
  // "Wake Up": { script: 'upstairs_state_wake_up' },
  "Morning": { script: 'upstairs_state_morning' },
  "Day": { script: 'upstairs_state_day' },
  "Early Evening": { script: 'upstairs_state_early_evening' },
  // "Work Day Day": { script: 'work_day_day' },
  // "Non Work Day": { script: 'non_work_day_day' },
  // "Early Evening": { script: 'early_evening' },
  "Late Evening": { script: 'upstairs_state_late_evening' },
  // "Get Ready For Bed": { script: 'upstaris_get_ready_for_bed' },
  // "Go To Sleep": { script: 'upstaris_go_to_sleep' },
  "Go to Sleep": { script: 'upstairs_state_go_to_sleep' },
  "Sleeping": { script: 'upstaris_state_sleeping' },

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

// Shared States
const sharedStates = {
  "Sleeping": { trigger: null },
}
// A map of the day types with each state of the day mapped to the trigger
// of when to change to specifyed state
export const dayTypeConfig = {
  'Work': {
    'Morning': { trigger: 'input_datetime.workday_morning' },
    'Day': { trigger: '09:00:00' },
    'Early Evening': { trigger: earlyEveningTrigger },
    'Late Evening': { trigger: '20:00:00' },
    ...sharedStates
  },
  'Non Work': {
    // 'Morning': { trigger: 'input_datetime.non_workday' },
    // 'Early Evening': { trigger: earlyEveningTrigger },
    // "Get Ready For Bed": { trigger: '20:30:00' },
    'Late Evening': { trigger: '20:00:00' },
    ...sharedStates
  },
  'Ski/Hike': {
    // 'Morning': { trigger: 'input_datetime.early_morning' },
    // 'Day': { trigger: '09:30:00' },
    // 'Early Evening': { trigger: earlyEveningTrigger },
    // 'Late Evening': { trigger: '20:30:00' },
    'Late Evening': { trigger: '20:00:00' },
    ...sharedStates
  },
  'House Sitter': {
    // 'Morning': { trigger: 'input_datetime.non_workday' },
    // 'Day': { trigger: '09:30:00' },
    // 'Early Evening': { trigger: earlyEveningTrigger },
    // 'Late Evening': { trigger: '20:30:00' },
    // 'Go to Sleep': { trigger: '00:45:00' },
    ...sharedStates
  },
  'Vacation': {
    'Morning': { trigger: 'input_datetime.workday_morning' },
    'Day': { trigger: '09:30:00' },
    'Early Evening': { trigger: earlyEveningTrigger },
    'Late Evening': { trigger: '18:17:00' },
    'Go to Sleep': { trigger: '22:43:00' },
    ...sharedStates
  },
};

export default {
  dayTypeSelectName,
  stateSelectName,
  homeStateMap,
  dayTypeConfig,
};
