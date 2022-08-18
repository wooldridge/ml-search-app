# minimal-search

Set up databases, servers, etc., and load records and config files for an Entity Viewer application.

`git clone https://github.com/wooldridge/minimal-search`

`cd minimal-search`

Install dependencies: `npm install`

Copy `config_sample.js` and save as `config.js`. Edit settings as needed for your MarkLogic environment.

Add your own data to the `install` directory if needed.

To set up: `node setup`

To remove the installed elements: `node teardown`
