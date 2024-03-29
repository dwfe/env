import {IRunMode} from '@do-while-for-each/common';
import dotenvExpand from 'dotenv-expand'
import dotenv from 'dotenv'
import fs from 'fs'
import {DOTENV_FILE} from './util/params.js'

/**
 * Preparing environment variables:
 *  1) load variables from .env* files into process.env;
 *  2) set process.env.NODE_ENV
 */
export function prepareEnv(nodeEnv: IRunMode) {
  /**
   * Prepare a selection of .env* files depending on the startup mode and priority:
   *  https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
   */
  const dotenvFiles = [
    `${DOTENV_FILE}.${nodeEnv}.local`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    nodeEnv !== 'test' && `${DOTENV_FILE}.local`,
    `${DOTENV_FILE}.${nodeEnv}`,
    DOTENV_FILE
  ].filter(Boolean) as string[];

  /**
   * Load environment variables from .env* files. Suppress warnings using silent
   * if this file is missing. dotenv will never modify any environment variables
   * that have already been set.  Variable expansion is supported in .env files.
   * https://github.com/motdotla/dotenv
   * https://github.com/motdotla/dotenv-expand
   */
  dotenvFiles.forEach(file => {
    if (fs.existsSync(file)) {
      dotenvExpand(
        dotenv.config({
          path: file
        })
      );
    }
  });
  process.env.NODE_ENV = nodeEnv;
}
