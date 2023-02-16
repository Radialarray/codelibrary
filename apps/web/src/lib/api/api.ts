import {AxiosError} from 'axios';
import https from 'https';
import {pipeWhileNotNil} from '../helper/helper';
import * as R from 'ramda';
import {addImageSources} from './addImages';

/**
 * Get the complete page content from a normal article page.
 * 1. Make Request
 * 2. Build content
 * 3. Add images
 * 4. Return page
 * @param {AxiosRequestConfig} req
 * @returns {Page}
 */

const requestPage = async (req: KQLRequestOptions): Promise<KQLResponse | Error> => {
	// Call an external API endpoint to get article.
	// You can use any data fetching library

	const envVars = {
		API_HOST: process.env.API_HOST ? process.env.API_HOST : '',
		API_USERNAME: process.env.API_USERNAME ? process.env.API_USERNAME : '',
		API_PASSWORD: process.env.API_PASSWORD ? process.env.API_PASSWORD : ''
	};

	try {
		const config =
			process.env.NODE_ENV === 'development'
				? {
						url: `https://${envVars.API_HOST}`,
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
						url: `https://${envVars.API_HOST}`,
						auth: {
							username: envVars.API_USERNAME,
							password: envVars.API_PASSWORD
						},
						...req
				  };

		process.env.NODE_ENV === 'development' ? (process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0') : '';

		const authVars = Buffer.from(`${config.auth.username}:${config.auth.password}`, `base64`);

		const headers = new Headers({
			Authorization: `Basic ${authVars}`,
			'Content-Type': 'application/json'
		});

		console.log(headers);

		// TODO: rewrite fetch
		const response = await fetch(config.url, {
			method: req.method,
			body: JSON.stringify(req.body),
			redirect: req.redirect,
			headers: headers
		});

		console.log('response');
		console.log(response);

		const data = response.data;
		return data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

const sortPage = (data: KQLResponse | AxiosError): Page => {
	console.log(data);
	if (data.code !== 200 || data.code === undefined || !R.has('result')(data)) {
		console.error('server response has error');
		console.error(data.code);
		// throw new Error('server response has error');
		const page = {
			meta: 'Error',
			content: 'content',
			images: 'result.images'
		};

		return page;
	}

	// if (R.has('result')(data)) {
	const result = data.result;
	const meta = {
		url: result.url,
		title: result.title,
		navigation: result.navigation,
		search: result.search,
		courses: result.courses ? result.courses : '',
		codeLanguages: result.codelanguages ? result.codelanguages : '',
		level: result.level ? result.level : '',
		categories: result.categories ? result.categories : '',
		headline: result.headline ? result.headline : '',
		intro: result.intro ? result.intro : ''
	};

	const parseContent = pipeWhileNotNil([JSON.parse]);
	const content: Block[] | Layout[] = parseContent(result.content);

	const page = {
		meta: meta,
		content: content,
		images: result.images
	};

	return page;
};

export const getPageContent = async (req: KQLRequestOptions): Promise<Page> => {
	const response = await requestPage(req);
	console.log(response);
	const sortedResponse = sortPage(response);
	const augmentedContent = addImageSources(sortedResponse);

	const page = {...sortedResponse, content: augmentedContent as Block[] | Layout[]};
	return page;
};
