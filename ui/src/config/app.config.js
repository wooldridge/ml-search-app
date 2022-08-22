const appConfig  = {  
	name: "MarkLogic Search App",
	components: "local", // "local" or "external"
	server: {
		host: "localhost",
		port: 4000,
		api: "node" // "search" for /v1/search, "node" for Node.js API
	}
}

export default appConfig;