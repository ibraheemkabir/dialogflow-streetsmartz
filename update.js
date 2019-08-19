const { agentPath, entitiesClient } = require('./Entity');

class EntityNotFoundError extends Error { };

entitiesClient
	.listEntityTypes({ parent: agentPath })
	.then((responses) => {
		// The array of EntityTypes is the 0th element of the response.
		const resources = responses[0];
		for (let i = 0; i < resources.length; i++) {
			const entity = resources[i];
			if (entity.displayName === 'city') {
				return entity;
			}
		}
		throw new EntityNotFoundError();
	})
	.then((city) => {
		console.log('Found city: ', JSON.stringify(city));
		const updatedEntityList = [
			{ value: 'New York', synonyms: ['New York', 'NYC'] },
			{ value: 'Los Angeles', synonyms: ['Los Angeles', 'LA', 'L.A.'] },
			{ value: 'Chicago', synonyms: ['Chicago'] },
			{ value: 'Houston', synonyms: ['Houston'] },
		];
		city.entities = updatedEntityList;
		const request = {
			entityType: city,
			updateMask: {
				paths: ['entities'],
			},
		};
		return entitiesClient.updateEntityType(request);
	})
	.then((responses) => {
		console.log('Updated entity type:', JSON.stringify(responses[0]));
	})
	.catch((err) => {
		// If this is the error we throw earlier in the chain, log the
		// cause of the problem.
		if (err instanceof EntityNotFoundError) {
			console.error('Could not find the entity named city.');
			return;
		}
		console.error('Error updating entity type:', err);
	});