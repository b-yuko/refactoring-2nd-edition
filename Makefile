pre-push:
	cd code && npm run lint
	cd code && npm run test
