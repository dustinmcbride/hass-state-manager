import config from "../config.mjs";
import makeStateListener  from "./makeListener.mjs";
import makeStateUpdater from "./makeUpdater.mjs";
import makeInputSelects from "./makeInputSelects.mjs";
import fs from 'fs';


const listener = makeStateListener(config);
const updater = makeStateUpdater(config);
const inputSelects = makeInputSelects(config);

const output = `
#
# Start of listener
#

${listener}

#
# Start of updater
#

${updater}

#
# Start of input selects
#

${inputSelects}
`
fs.writeFileSync('./state_manager.yml', output);

console.log(output);
