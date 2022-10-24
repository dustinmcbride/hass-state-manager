import YAML from "yaml";
import crypto from "crypto";
import { dayTypeMap, homeStateMap, dayTypeConfig } from "./config.mjs";
import { exit } from "process";

const time = (at) => ({
  platform: "time",
  at,
});

const makeTriggerId = (stateChangeConfig) => {
  if (typeof stateChangeConfig.trigger == "string") {
    return stateChangeConfig.trigger;
  } else {
    return crypto
      .createHash("md5")
      .update(JSON.stringify(stateChangeConfig))
      .digest("hex");
  }
};

function makeTrigger(stateChangeConfig) {
  let result = { id: makeTriggerId(stateChangeConfig) };

  if (typeof stateChangeConfig.trigger == "string") {
    result = { ...time(stateChangeConfig.trigger), ...result };
  } else {
    result = { ...stateChangeConfig.trigger, ...result };
  }

  return result;
}

function makeStateUpdater(dayTypeConfig) {
  const results = {
    alias: "State Updater: Home State",
    description: "Responsible for scheduled home state changes",
    mode: "single",
    trigger: [],
    action: [],
  };

  Object.keys(dayTypeConfig.dayTypes).forEach((dayType) => {
    // Triggers
    Object.keys(dayTypeConfig.dayTypes[dayType]).forEach((stateChangeId) => {
      const stateChangeConfig = {
        id: stateChangeId,
        ...dayTypeConfig.dayTypes[dayType][stateChangeId],
      };

      if (!stateChangeConfig.trigger) return;

      const newTrigger = makeTrigger(stateChangeConfig);

      const found = results.trigger.find(
        (trigger) => trigger.id === newTrigger.id
      );

      if (!found) {
        results.trigger.push(newTrigger);
      }
    });

    // Action
    results.action.push({
      if: [
        {
          condition: "state",
          entity_id: "input_select.day_type",
          state: dayTypeMap[dayType],
        },
      ],
      then: [
        {
          choose: Object.keys(dayTypeConfig.dayTypes[dayType])
            .map((stateChangeId) => {
              const stateChange = {
                id: stateChangeId,
                ...dayTypeConfig.dayTypes[dayType][stateChangeId],
              };

              if (!stateChange.trigger) return null;

              return {
                conditions: [
                  { condition: "trigger", id: makeTriggerId(stateChange) },
                ],

                sequence: [
                  {
                    service: "input_select.select_option",
                    data: {
                      option: homeStateMap[stateChange.id].name,
                    },
                    target: {
                      entity_id: "input_select.home_state",
                    },
                  },
                ],
              };
            })
            .filter((i) => i != null),
        },
      ],
    });
  });

  const doc = new YAML.Document();
  doc.contents = results;

  return doc.toString();
}

const makeStateListener = () => {
  const result = {
    alias: "State Listener: Home State ",
    description: "Reacts to the state updaters and runs scripts",
    trigger: [
      {
        platform: "state",
        entity_id: ["input_select.home_state"],
      },
    ],
    condition: [],
    action: [],
  };

  Object.keys(dayTypeConfig.dayTypes).forEach((dayType) => {
    const action = {
      if: [
        {
          condition: "state",
          entity_id: "input_select.day_type",
          state: dayTypeMap[dayType],
        },
      ],
      then: [
        {
          choose: Object.keys(dayTypeConfig.dayTypes[dayType]).map(
            (stateChangeId) => {
              const stateChange = {
                id: stateChangeId,
                ...dayTypeConfig.dayTypes[dayType][stateChangeId],
              };
              return {
                conditions: [
                  {
                    condition: "state",
                    entity_id: "input_select.home_state",
                    state: homeStateMap[stateChange.id].name,
                  },
                ],
                sequence: [
                  { service: `script.${homeStateMap[stateChange.id].script}` },
                ],
              };
            }
          ),
        },
      ],
    };

    result.action.push(action);
  });

  result.action.push({
    service: "notify.mobile_app_dustin_iphone",
    data: {
      message: "State Listener: {{ states.input_select.home_state.state }}",
    },
  });

  const doc = new YAML.Document();
  doc.contents = result;

  return doc.toString();
};

const commandLineArg = process.argv[2];

if (["-h", "--help", "help"].includes(commandLineArg)) {
  console.log(`
    Usage:
    make [ listener | updater | help ]
  `);
  exit();
}

const listener = makeStateListener(dayTypeConfig);
const updater = makeStateUpdater(dayTypeConfig);

if (commandLineArg == "listener") {
  console.log(listener);
}

if (commandLineArg == "updater") {
  console.log(updater);
}
