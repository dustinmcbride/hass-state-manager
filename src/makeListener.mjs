import YAML from 'yaml';
import { inputSelectName } from './utils.mjs';

export default (config) => {
  const {
    stateSelectName, dayTypeConfig, dayTypeSelectName, homeStateMap,
  } = config;

  const result = {
    alias: 'State Listener: Home State ',
    description: 'Reacts to the state updaters and runs scripts',
    trigger: [
      {
        platform: 'state',
        // This was an array, changed to string.
        entity_id: inputSelectName(stateSelectName),
      },
    ],
    condition: [],
    action: [],
  };

  Object.keys(dayTypeConfig).forEach((dayType) => {
    const action = {
      if: [
        {
          condition: 'state',
          entity_id: inputSelectName(dayTypeSelectName),
          state: dayType,
        },
      ],
      then: [
        {
          choose: Object.keys(dayTypeConfig[dayType]).map(
            (stateChangeId) => {
              const stateChange = {
                id: stateChangeId,
                ...dayTypeConfig[dayType][stateChangeId],
              };
              return {
                conditions: [
                  {
                    condition: 'state',
                    entity_id: inputSelectName(stateSelectName),
                    state: stateChange.id,
                  },
                ],
                sequence: [
                  { service: `script.${homeStateMap[stateChange.id].script}` },
                ],
              };
            },
          ),
        },
      ],
    };

    result.action.push(action);
  });

  // Make configurable
  result.action.push({
    service: 'notify.mobile_app_dustin_iphone',
    data: {
      message: 'State Listener: {{ states.input_select.home_state.state }}',
    },
  });

  const doc = new YAML.Document();
  doc.contents = result;

  return doc.toString();
};
