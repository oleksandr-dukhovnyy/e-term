///<reference path="../types/types.d.ts" />

import createETerm from './core/index';
import render from './core/render';

// export default Terminal;

const term = createETerm({
  commands: {
    echo() {
      console.log('echo');
    },
  },
});

render('.rez', term);
