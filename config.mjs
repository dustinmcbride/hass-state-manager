export const dayTypeMap = {
  work: "Work",
  nonWork: "Non Work",
  skiHike: "Ski/Hike",
  houseSitter: "House Sitter",
  vacation: "Vacation",
};

export const homeStateMap = {
  morning: { name: "Morning", script: "morning" },
  midMorning: { name: "Mid-morning", script: "home_state_midmorning" },
  day: { name: "Day", script: "home_state_day" },
  lunch: { name: "Lunch", script: "home_state_lunch" },
  afternoon: { name: "Afternoon", script: "home_state_afternoon" },
  earlyEvening: { name: "Early Evening", script: "home_state_early_evening" },
  lateEvening: { name: "Late Evening", script: "home_state_late_evening" },
  dinner: { name: "Dinner", script: "home_state_dinner" },
  dishes: { name: "Dishes", script: "home_state_dishes" },
  getReadyForBed: {
    name: "Get Ready For Bed",
    script: "home_state_get_ready_for_bed",
  },
  goToSleep: { name: "Go to Sleep", script: "home_state_go_to_sleep" },
  sleeping: { name: "Sleeping", script: "home_state_sleeping" },
};

const earlyEveningTrigger = {
  platform: "numeric_state",
  id: "early_evening",
  entity_id: "sun.sun",
  attribute: "elevation",
  below: 4.4,
};

const sharedStates = {
  dinner: { trigger: null },
  dishes: { trigger: null },
  getReadyForBed: { trigger: null },
  goToSleep: { trigger: null },
  sleeping: { trigger: null },
};

export const dayTypeConfig = {
  dayTypes: {
    work: {
      ...sharedStates,
      morning: { trigger: "input_datetime.workday_morning" },
      midMorning: { trigger: "09:30:00" },
      lunch: { trigger: "11:50:00" },
      afternoon: { trigger: "12:45:00" },
      earlyEvening: { trigger: earlyEveningTrigger },
      lateEvening: { trigger: "20:30:00" },
    },
    nonWork: {
      ...sharedStates,
      morning: { trigger: "input_datetime.non_workday" },
      day: { trigger: "09:30:00" },
      earlyEvening: { trigger: earlyEveningTrigger },
      lateEvening: { trigger: "20:30:00" },
    },
    skiHike: {
      ...sharedStates,
      morning: { trigger: "input_datetime.early_morning" },
      day: { trigger: "09:30:00" },
      earlyEvening: { trigger: earlyEveningTrigger },
      lateEvening: { trigger: "20:30:00" },
    },
    houseSitter: {
      ...sharedStates,
      morning: { trigger: "input_datetime.non_workday" },
      day: { trigger: "09:30:00" },
      earlyEvening: { trigger: earlyEveningTrigger },
      lateEvening: { trigger: "20:30:00" },
      goToSleep: { trigger: "0:45:00" },
    },
    vacation: {
      ...sharedStates,
      morning: { trigger: "input_datetime.non_workday" },
      day: { trigger: "09:30:00" },
      earlyEvening: { trigger: earlyEveningTrigger },
      lateEvening: { trigger: "20:30:00" },
      goToSleep: { trigger: "11:30:00" },
    },
  },
};
