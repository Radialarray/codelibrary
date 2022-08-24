import type {NextPage} from 'next';
import type {NextApiRequest, NextApiResponse} from 'next';
import {GetStaticProps} from 'next';
import {getPageContent, queryContent} from '../lib/api';
import axios from 'axios';
import htmlReactParser from 'html-react-parser';
import {parseBlocks} from '../components/block';
import * as R from 'ramda';

// article will be populated at build time by getStaticProps()
const Article = (props: PageContent) => {
	const htmlElements = parseBlocks(props.content);
	return <>{htmlElements}</>;
};

const requestBody = {
	query: 'page("article")',
	select: {
		url: true,
		title: true,
		courses: true,
		codelanguages: true,
		level: true,
		categories: true,
		headline: true,
		intro: true,
		content: 'page.content.main',
		images: {
			query: 'page.images',
			select: {
				url: true,
				filename: true
			}
		}
	},
	pagination: {limit: 10}
};

const requestOptions = {
	method: 'post',
	data: requestBody,
	redirect: 'follow'
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async context => {
	// const data: KQLResponse = await handler(requestOptions);

	const response = await getPageContent(requestOptions);
	const blocks = response.content;
	const images = response.images;

	// const addImageSource = (blocks, images) => {
	// 	const isImageBlock = R.propEq('type', 'image');
	// 	return R.filter(isImageBlock, blocks);
	// };

	// 	const isImageBlock = R.propEq('type', 'image');
	// const addImageSource = (blocks: Block[], images: []) => R.map(R.when(isImageBlock));

	const addImageUrls =
		(images: []) =>
		(blocks: Block[]): Block[] => {
			const blocksWithImagesSrc = blocks.map(block => {
				if (block.type === 'image') {
					const content = block.content;
					const imageSrc = R.find(R.propEq('filename', (block.content as ImageContent).image[0]))(
						images
					);

					if (!R.isNil(imageSrc) && (imageSrc as Image).url) {
						const newContent = R.assoc('url', (imageSrc as Image).url, content);
						return {...block, content: newContent};
					} else {
						throw new Error('No image source found!');
					}
				}
				if (block.type === 'gallery') {
					const content = block.content as GalleryContent;
					// 1. Get first image of gallery images array
					const iterateImages = (fn: any, data: Content) => {
						return R.map(fn, data);
					};
					// const log = (x: unknown) => console.log(x);
					// const test = iterateImages(log, content);
					// 2.	Find image by name in data images array
					// 2.1. R.propEq(): Check if image property exists in data images array.
					// 2.2. R.find(): Iterate data images array to find correct image.
					const findImage = (key: string, value: string, data: []) =>
						R.find(R.propEq(key, value))(data);
					// const test2 = findImage('filename', 'smallsimulation3.jpg', images);
					// console.log(test2);
					const imageSources = content.images.map(x => {
						const image = findImage('filename', x as string, images);
						return image;
					});

					return {...block, content: {images: imageSources}};
				}

				return block;
			});
			return blocksWithImagesSrc as Block[];
		};

	const content = addImageUrls(images)(blocks);
	// console.log(Array.isArray(content));
	// console.log(content);
	// const articleContent = content.content;
	// // Props returned will be passed to the page component
	return {
		props: {content}
	};
};

export default Article;
