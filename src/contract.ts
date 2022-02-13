import {TRunMode} from '@do-while-for-each/common';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: TRunMode;
    }
  }
}
