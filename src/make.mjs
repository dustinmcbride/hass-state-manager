import config from "../config2.mjs";
import makeStateListener from "./makeListener.mjs";
import makeStateUpdater from "./makeUpdater.mjs";
import makeInputSelects from "./makeInputSelects.mjs";
import YAML from "yaml";

const commandLineArg = process.argv[2];

if (["-h", "--help", "help"].includes(commandLineArg)) {
  console.log(`
    Usage:
    make [  selects | automations | help ]
  `);
  exit();
}

const doc = new YAML.Document();

if (commandLineArg === "automations") {
  const listener = makeStateListener(config);
  const updater = makeStateUpdater(config);
  doc.contents = [listener, updater];
}

if (commandLineArg === "selects") {
  const inputSelects = makeInputSelects(config);
  doc.contents = inputSelects;
}

console.log(
  doc.toString({ defaultStringType: "QUOTE_SINGLE", defaultKeyType: "PLAIN" })
);
