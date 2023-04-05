import https from 'https';

/**
 * Get the complete page content from a normal article page.
 * 1. Make Request
 * 2. Build content
 * 3. Add images
 * 4. Return page
 */

export const requestData = async (req: KQLRequestOptions): Promise<KQLResponse> => {
	// Call an external API endpoint to get article.
	// You can use any data fetching library

	const envVars = {
		API_HOST: process.env.API_HOST ? process.env.API_HOST : '',
		API_USERNAME: process.env.API_USERNAME ? process.env.API_USERNAME : '',
		API_PASSWORD: process.env.API_PASSWORD ? process.env.API_PASSWORD : ''
	};
	const config =
		process.env.NODE_ENV === 'development'
			? {
					url: `${envVars.API_HOST}`,
					auth: {
						username: envVars.API_USERNAME,
						password: envVars.API_PASSWORD
					},
					httpsAgent: new https.Agent({
						rejectUnauthorized: false
					}),
					...req
			  }
			: {
					url: `${envVars.API_HOST}`,
					auth: {
						username: envVars.API_USERNAME,
						password: envVars.API_PASSWORD
					},
					// TODO: remove from production
					httpsAgent: new https.Agent({
						rejectUnauthorized: false
					}),
					...req
			  };

	process.env.NODE_ENV === 'development' ? (process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0') : '';
	// TODO: remove from production
	process.env.NODE_ENV === 'production' ? (process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0') : '';

	const authVars = Buffer.from(`${config.auth.username}:${config.auth.password}`).toString(
		'base64'
	);

	const headers = new Headers({
		Authorization: `Basic ${authVars}`,
		'Content-Type': 'application/json'
	});

	try {
		const response = await fetch(config.url, {
			method: req.method,
			body: JSON.stringify(req.body),
			redirect: req.redirect,
			headers: headers
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return error as KQLResponse;
	}
};

export const getPageContent = async (req: KQLRequestOptions): Promise<KQLResponse> => {
	const response = await requestData(req);

	return response;
};
