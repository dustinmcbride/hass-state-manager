import YAML from 'yaml';
import { toSnakeCase } from 'js-convert-case';

export default (config) => {
  const {dayTypeSelectName, stateSelectName, dayTypeConfig, homeStateMap } = config;

  const selects = [
    {
      name: dayTypeSelectName,
      options: Object.keys(dayTypeConfig),
    },
    {
      name: stateSelectName,
      options: Object.keys(homeStateMap),
    },
  ];

  const result = {
    input_select: {},
  };

  selects.forEach(({ name, options }) => {
    result.input_select[toSnakeCase(name)] = {
      name, options,
    };
  });

  const doc = new YAML.Document();
  doc.contents = result;

  return doc.toString();
};
