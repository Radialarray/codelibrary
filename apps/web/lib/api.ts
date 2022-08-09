import axios, {AxiosRequestConfig, AxiosResponse, AxiosError, Axios} from 'axios';
import * as R from 'ramda';
export const queryContent = async (req: AxiosRequestConfig) => {
	// Call an external API endpoint to get article.
	// You can use any data fetching library
	try {
		const response = await axios({
			url: process.env.API_URL,
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

export const buildContent = async (data: KQLResponse): Promise<PageContent> => {
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
	const pipeWhileNotNil = R.pipeWith((f, res) => (R.isNil(res) ? res : f(res)));
	const parseContent = pipeWhileNotNil([JSON.parse]);

	const content = parseContent(result.content);

	const pageContent = {
		meta: meta,
		content: content
	};

	return pageContent;
};

/**
 * Get the complete page content from a normal article page.
 * @param {AxiosRequestConfig} req
 * @returns {PageContent}
 */
export const getPageContent = async (req: AxiosRequestConfig): Promise<PageContent> => {
	const data = await queryContent(req);
	if (data.code !== 200 || data.code === undefined) {
		console.error('something happened');
		return data;
	} else {
		const pageContent = await buildContent(data);
		return pageContent;
	}
};

/**
 * Parses blocks from block content editor data from KQL response.
 * @param {PageContent} data
 * @returns {HTMLElement[]}
 */
export const parseBlocks = async (data: PageContent) => {
	const blocks = data.content;
	return blocks;
};
