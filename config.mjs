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
};

const earlyEveningTrigger = {
  platform: "numeric_state",
  id: "early_evening",
  entity_id: "sun.sun",
  attribute: "elevation",
  below: 4.4,
};

export const dayTypeConfig = {
  condition_select: "day_type",
  update_select: "home_state",
  dayTypes: {
    work: [
      { id: "morning", trigger: "input_datetime.workday_morning" },
      { id: "midMorning", trigger: "09:30:00" },
      { id: "lunch", trigger: "11:50:00" },
      { id: "afternoon", trigger: "12:45:00" },
      { id: "earlyEvening", trigger: earlyEveningTrigger },
      { id: "lateEvening", trigger: "20:30:00" },
    ],
    nonWork: [
      { id: "morning", trigger: "input_datetime.non_workday" },
      { id: "day", trigger: "09:30:00" },
      { id: "earlyEvening", trigger: earlyEveningTrigger },
      { id: "lateEvening", trigger: "20:30:00" },
    ],
    skiHike: [
      { id: "morning", trigger: "input_datetime.early_morning" },
      { id: "day", trigger: "09:30:00" },
      { id: "earlyEvening", trigger: earlyEveningTrigger },
      { id: "lateEvening", trigger: "20:30:00" },
    ],
    houseSitter: [
      { id: "morning", trigger: "input_datetime.non_workday" },
      { id: "day", trigger: "09:30:00" },
      { id: "earlyEvening", trigger: earlyEveningTrigger },
      { id: "lateEvening", trigger: "20:30:00" },
    ],
  },
};
