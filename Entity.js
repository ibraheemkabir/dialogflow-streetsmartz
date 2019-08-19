'use strict'

const dialogflow = require('dialogflow');

const credentials =require('./df.json')

const entitiesClient = new dialogflow.EntityTypesClient({
	credentials: credentials
})

const projectId = 'df-street-smarts-ptxmgl';
const agentPath = entitiesClient.projectAgentPath(projectId);
 module.exports= {
	 credentials,
	 entitiesClient,
	 agentPath
 }