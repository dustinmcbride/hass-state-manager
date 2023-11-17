import YAML from 'yaml';
import { inputSelectName } from './utils.mjs';

const time = (at) => ({
  platform: 'time',
  at,
});

const makeTriggerId = (stateChangeConfig) => {
  if (typeof stateChangeConfig.trigger === 'string') {
    return stateChangeConfig.trigger;
  }
  return stateChangeConfig.trigger.triggerId;
};

function makeTrigger(stateChangeConfig) {
  let result = { id: makeTriggerId(stateChangeConfig) };

  if (typeof stateChangeConfig.trigger === 'string') {
    result = { ...time(stateChangeConfig.trigger), ...result };
  } else {
    result = { ...stateChangeConfig.trigger, ...result };
    delete result.triggerId;
  }
  return result;
}

export default (config) => {
  const { dayTypeConfig, dayTypeSelectName, stateSelectName } = config;
  const results = {
    alias: `State Updater: ${stateSelectName}`,
    id: `State Updater: ${stateSelectName}`,
    description: 'Responsible for scheduled home state changes',
    mode: 'single',
    trigger: [],
    action: [],
  };

  Object.keys(dayTypeConfig).forEach((dayType) => {
    // Triggers
    Object.keys(dayTypeConfig[dayType]).forEach((stateChangeId) => {
      const stateChangeConfig = {
        id: stateChangeId,
        ...dayTypeConfig[dayType][stateChangeId],
      };

      if (!stateChangeConfig.trigger) return;

      const newTrigger = makeTrigger(stateChangeConfig);

      const found = results.trigger.find(
        (trigger) => trigger.id === newTrigger.id,
      );

      if (!found) {
        results.trigger.push(newTrigger);
      }
    });

    // Action
    results.action.push({
      if: [
        {
          condition: 'state',
          entity_id: inputSelectName(dayTypeSelectName),
          state: dayType,
        },
      ],
      then: [
        {
          choose: Object.keys(dayTypeConfig[dayType])
            .map((stateChangeId) => {
              const stateChange = {
                id: stateChangeId,
                ...dayTypeConfig[dayType][stateChangeId],
              };

              if (!stateChange.trigger) return null;

              return {
                conditions: [
                  { condition: 'trigger', id: makeTriggerId(stateChange) },
                ],

                sequence: [
                  {
                    service: 'input_select.select_option',
                    data: {
                      option: stateChange.id,
                    },
                    target: {
                      entity_id: inputSelectName(stateSelectName),
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

  return doc
};
