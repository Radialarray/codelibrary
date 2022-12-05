import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import https from 'https';
import {pipeWhileNotNil} from '../helper/helper';
import * as R from 'ramda';

const augmentImageSrc = (block: Block, images: Image[]) => {
	if (block.type === 'image') {
		const content = block.content;
		const imageSrc = R.find(R.propEq('filename', (block.content as ImageContent).image[0]))(images);
		if (!R.isNil(imageSrc) && (imageSrc as Image).url) {
			const newContent = {
				...content,
				src: (imageSrc as Image).url,
				width: (imageSrc as Image).dimensions.width,
				height: (imageSrc as Image).dimensions.height,
				ratio: (imageSrc as Image).dimensions.ratio,
				orientation: (imageSrc as Image).dimensions.orientation
			};
			return {...block, content: newContent};
		} else {
			throw new Error('No image source found!');
		}
	}

	if (block.type === 'gallery') {
		const content = block.content as KQLGalleryBlock;
		// 1. Get first image of gallery images array
		// 2.	Find image by name in data images array
		// 2.1. R.propEq(): Check if image property exists in data images array.
		// 2.2. R.find(): Iterate data images array to find correct image.
		const findImage = (key: string, value: string, data: Image[]) =>
			R.find(R.propEq(key, value))(data);
		// const test2 = findImage('filename', 'smallsimulation3.jpg', images);
		// console.log(test2);

		const imageSources = content.images.map(filename => {
			const image = findImage('filename', filename, images);
			const newContent: ImageContent = {
				location: '',
				image: [(image as Image).filename],
				src: (image as Image).url,
				alt: (image as Image).filename,
				caption: '',
				link: '',
				crop: 'false',
				width: (image as Image).dimensions.width,
				height: (image as Image).dimensions.height,
				ratio: (image as Image).dimensions.ratio,
				orientation: (image as Image).dimensions.orientation
			};

			const newBlock: Block = {
				content: {
					...newContent
				},
				id: block.id + (image as Image).filename,
				isHidden: false,
				type: 'Image'
			};

			return newBlock;
		});

		return {...block, content: {images: imageSources}};
	}

	return block;
};

// export const augmentContentImageSrc = (page: Page): Block[] | Layout[] => {
// 	// Walk over layout with columns or blocks directly
// 	// const decideLayoutBlock = R.ifElse(
// 	// 	R.has('columns'),
// 	// 	x =>
// 	// 		(x.columns as Block[]).map((block: Block) => {
// 	// 			augmentImageSrc(block, images);
// 	// 		}),
// 	// 	x => augmentImageSrc(x as Block, images)
// 	// );

// 	// Walk over content
// 	const contentWithImageSrcs = page.content.map(x => {
// 		if (R.has('columns')(x)) {
// 			x.columns.map(column => {
// 				const block = column.blocks.map(block => {
// 					return augmentImageSrc(block, page.images);
// 				});
// 				return {...column, block};
// 			});
// 		}
// 		return {};
// 	});
// };

// /**
//  * Get the complete page content from a normal article page.
//  * 1. Make Request
//  * 2. Build content
//  * 3. Add images
//  * 4. Return page
//  * @param {AxiosRequestConfig} req
//  * @returns {Page}
//  */
// export const getPageContent2 = async (req: AxiosRequestConfig): Promise<Page> => {
// 	const data = await queryContent(req);
// 	const page = await buildContent(data);
// 	const augmentedContent = augmentContentImageSrc(page);
// 	return {
// 		meta: page.meta,
// 		content: augmentedContent,
// 		images: page.images
// 	};
// };

const requestPage = async (req: KQLRequestOptions): Promise<KQLResponse | AxiosError> => {
	// Call an external API endpoint to get article.
	// You can use any data fetching library

	const envVars = {
		API_HOST: process.env.API_HOST ? process.env.API_HOST : '',
		API_USERNAME: process.env.API_USERNAME ? process.env.API_USERNAME : '',
		API_PASSWORD: process.env.API_PASSWORD ? process.env.API_PASSWORD : ''
	};

	try {
		const config: AxiosRequestConfig =
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
		// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

		const response = await axios(config);
		const data = response.data;
		return data;
	} catch (error) {
		const err = error as AxiosError;
		console.error(err);
		return err;
	}
};

const sortPage = (data: KQLResponse | AxiosError): Page => {
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

const addImageSources = (page: Page) => {
	if (page === undefined || typeof page.content === 'string') {
		throw new Error('Page is undefined!');
	}

	const augmentedBlocks = page.content.map(content => {
		if (R.has('columns')(content)) {
			const columns = content.columns.map(column => {
				const blocks = column.blocks.map(block => {
					// console.log('block', block);
					if (typeof page.images === 'string') {
						throw new Error('Page.images not an array!');
					}
					return augmentImageSrc(block, page.images);
				});
				return {...column, blocks};
			});

			return {...content, columns};
		} else {
			// TODO: what to do if not a layout but only a block
			return undefined;
		}
	});

	return augmentedBlocks;
};

export const getPageContent = async (req: KQLRequestOptions): Promise<Page> => {
	const response = await requestPage(req);
	const sortedResponse = sortPage(response);
	const augmentedContent = addImageSources(sortedResponse);

	const page = {...sortedResponse, content: augmentedContent as Block[] | Layout[]};
	return page;
};
