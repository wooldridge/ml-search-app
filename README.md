# ml-search-app

A MarkLogic search application with a React UI and a Node.js middle tier.

The UI uses components from MarkLogic Entity Viewer.

## Requirements

- MarkLogic Server
- Node.js
- npm

## Set up and run middle tier 

Configure application:

`cd ml-search-app`

Copy `config_sample.js` and save as `config.js`. Edit settings as needed for your MarkLogic environment.

Install setup and server dependencies:

`npm install`

Set up databases, servers, etc., and load records and config files for application:

`cd setup`

`node setup`

(To remove the installed elements: `node teardown`)

Run server:

`cd ../server`

`node server`

## Set up and run UI

Install UI dependencies: 

`cd ../ui`

`npm install`

Optionally edit UI configuration in `config` directory.

Run UI application:

`npm start`


