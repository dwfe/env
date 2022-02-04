import {getEnv} from './get-env.js'

/**
 * Stringify all values so we can pass it to e.g. webpack DefinePlugin
 */
export function stringifiedProcessEnv(): { 'process.env': TProcessEnv } {
  return {
    'process.env': Object.entries(getEnv())
      .reduce((acc, [key, value]) => {
        acc[key] = JSON.stringify(value);
        return acc;
      }, {} as TProcessEnv)
  }
}

type TProcessEnv = { [key: string]: string };
