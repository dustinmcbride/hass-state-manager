import { toSnakeCase } from 'js-convert-case';


export const inputSelectName = (name) => `input_select.${toSnakeCase(name)}`
