# ml-search-app

A MarkLogic search application with a React UI and a Node.js Express middle tier. The middle tier can be configured to access either the MarkLogic /v1/search API or MarkLogic Node.js API. **The three-tier app demonstrates how a single set of UI components can work with different MarkLogic APIs via configuration files.**

The UI uses components developed for MarkLogic Entity Viewer v1:

- SearchBox
- ResultsList
- Address
- Chiclet
- Concat
- DateTime
- Image
- List
- ResultActions
- Value

## Multi-API proof of concept

![ml-search-app Architecture](https://user-images.githubusercontent.com/477757/186080420-4fb06bdc-c636-4b71-a319-b89dc00a057a.png)

1. In both modes, the same Entity Viewer React components are installed from npm. 

2a. When accessing the /v1/search API, a search.config file maps the ResultsList component to the API payload. The UI app hits the `/search` endpoint exposed by the Express middle tier. 

2b. When accessing the Node.js API, a searchNode.config file maps the ResultsList component to the API payload. The UI app hits the `/searchWithNode` endpoint exposed by the Express middle tier. Since both APIs accept the same string query, the SearchBox configuration remains the same (but this could vary in other application arrangements).

3a. The /v1/search API returns a JSON results object to Express which forwards it to the UI. The UI understands how to populate the view via the search.config file.

3b. The Node.js API returns a JSON results object to Express which forwards it to the UI. The UI understands how to populate the view via the searchNode.config file.

## Requirements

- MarkLogic Server
- Node.js
- npm

## Set up and run middle tier 

`cd ml-search-app`

Copy `config_sample.js` and save as `config.js`. Edit settings as needed for your MarkLogic environment (at a minimum, `config.path`, `config.auth.user`, and `config.auth.pass` values).

Install back-end dependencies:

`npm install`

This includes installing the MarkLogic Node.js API for database access.

Set up databases, servers, etc., and load records and config files for application:

`cd setup`

`node setup`

Setup installs the following:

- Content database (and forest)
- Modules database (and forest)
- REST server
- XDBC server (not used)
- App role (not used yet)
- App user (not used yet)
- Sample data (100 person records as XML)
- Search options (for /v1/search)

(To remove the installed elements: `node teardown`)

Run server:

`cd ../server`

`node server`

The Express server exposes a `/search` endpoint for Search API (v1/search) access and `/searchWithNode` endpoint for Node.js access. Both accept a MarkLogic string query which is sent as a URL param.

## Set up and run UI

In a new terminal, install UI dependencies: 

`cd ml-search-app/ui`

`npm install`

This installs React plumbing and the npm library with the Entity Viewer UI components.

Optionally edit UI configuration in `config` directory. Editing the configuration files lets you:

- Use the external components installed from npm (or use simple OOTB ones instead).
- Use Search API mode or Node.js mode.
- Control the look and feel and behavior of the UI components (similar to what is possible in Entity Viewer v1).

The majority of the configuration happens on the UI side via JSONPath expressions, which map UI components to the API payloads. This strategy was honed during the development of Entity Viewer v1.

Run UI application in development mode:

`npm start`

Open the application in a browser:

http://localhost:3000
