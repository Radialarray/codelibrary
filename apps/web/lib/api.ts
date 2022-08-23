import axios, {AxiosRequestConfig, AxiosResponse, AxiosError, Axios} from 'axios';
import * as R from 'ramda';
import {pipeWhileNotNil} from './helper';
export const queryContent = async (req: AxiosRequestConfig) => {
	// Call an external API endpoint to get article.
	// You can use any data fetching library
	try {
		const response = await axios({
			url: `https://${process.env.API_HOST}`,
			auth: {
				username: process.env.API_USERNAME!,
				password: process.env.API_PASSWORD!
			},
			...req
		});
		const data = response.data;
		return data;
	} catch (error) {
		const err = error as AxiosError;
		console.error(err);
		return {
			code: err.code,
			message: err.message
		};
	}
};

export const buildContent = async (data: KQLResponse): Promise<Page> => {
	const result = data.result;
	if (result === undefined) {
		throw new Error('Page seems empty!');
	}
	const meta = {
		url: result.url,
		title: result.title
		// courses: result.courses,
		// codeLanguages: result.codeLanguages,
		// level: result.level,
		// categories: result.categories,
		// headline: result.headline,
		// intro: result.intro
	};

	if (result.content === undefined) {
		throw new Error('Page content seems empty!');
	}
	const parseContent = pipeWhileNotNil([JSON.parse]);

	const content = parseContent(result.content);

	const pageContent = {
		meta: meta,
		content: content,
		images: result.images
	};

	return pageContent;
};

/**
 * Get the complete page content from a normal article page.
 * @param {AxiosRequestConfig} req
 * @returns {Page}
 */
export const getPageContent = async (req: AxiosRequestConfig): Promise<Page> => {
	const data = await queryContent(req);
	if (data.code !== 200 || data.code === undefined) {
		console.error('something happened');
		return data;
	} else {
		const pageContent = await buildContent(data);
		return pageContent;
	}
};
