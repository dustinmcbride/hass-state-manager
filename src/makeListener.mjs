import YAML from "yaml";


export default (config) => {
   const { dayTypeMap, homeStateEntity, dayTypeConfig, dayTypeConfigEntity, homeStateMap } = config

    const result = {
      alias: "State Listener: Home State ",
      description: "Reacts to the state updaters and runs scripts",
      trigger: [
        {
          platform: "state",
          entity_id: [homeStateEntity],
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
            entity_id: dayTypeConfigEntity,
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
                      entity_id: homeStateEntity,
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
