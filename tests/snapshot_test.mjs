import fs from 'fs'
import config from './fixtures/config.mjs'
import makeListener from '../src/makeListener.mjs'
import makeUpdater from '../src/makeUpdater.mjs'

describe("Snapshots", () => {
  it('it renders the the listner correctly', () => {
    const expected = fs.readFileSync('./tests/snapshots/listener.yml', "utf8")
    expect(expected).toEqual(makeListener(config))
  })

  it('it renders the updater correctly', () => {
    const expected = fs.readFileSync('./tests/snapshots/updater.yml', "utf8")
    expect(expected).toEqual(makeUpdater(config))
  })

})
