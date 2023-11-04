# hass-state-machine

A tool for creating a lightweight "state machine" in Home Assistant

## How does this work?
The concept for this lightweight "state machine" is that your Home should move through various states throughout the day. Wake Up -> Morning -> Afternoon... In addition, there should be different day types (work, non-work, vacation) that follow different states and schedules. Lastly, common triggers for state and the automation for state should be easily shared and configured.

The state of your home is managed with an input selector. When the input selector changes a script can be fired to make the changes you want in your home. The input slector can be manually changed but its much more powerful to change it with a trigger like the time, a button or the angle of the sun.

Lastly the set of trigger can be different for each day type.

## Why


This creates to Home Assistant Automations
 1. A State Listener
 This autmations whatches your day state input selecor adn then fire the approprate script for the apportate day type

 2. A State Updater
 This is an automation with all your triggers that update the day state input selecor

### Setup
- Home assistant up and running
- Create a dropdown

## Usage
node make --help
