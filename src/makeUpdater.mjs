import crypto from "crypto";
import YAML from "yaml";


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




export default (config) => {
    const {dayTypeConfig, dayTypeConfigEntity, dayTypeMap, homeStateMap, homeStateEntity} =  config
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
            entity_id: dayTypeConfigEntity,
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
                        entity_id: homeStateEntity,
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
