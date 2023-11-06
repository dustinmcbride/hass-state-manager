import fs from 'fs';
import config from './fixtures/config';
import makeListener from '../src/makeListener';
import makeUpdater from '../src/makeUpdater';
import makeInputSelects from '../src/makeInputSelects';

describe('Snapshots', () => {
  it('it renders the the listner correctly', () => {
    const expected = fs.readFileSync('./tests/snapshots/listener.yml', 'utf8');
    expect(makeListener(config)).toEqual(expected);
  });

  it('it renders the updater correctly', () => {
    const expected = fs.readFileSync('./tests/snapshots/updater.yml', 'utf8');
    expect(makeUpdater(config)).toEqual(expected);
  });

  it('it renders the input select correctly', () => {
    const expected = fs.readFileSync('./tests/snapshots/inputSelect.yml', 'utf8');

    expect(makeInputSelects(config)).toEqual(expected);
  });
});