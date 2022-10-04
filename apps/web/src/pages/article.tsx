import {GetStaticProps} from 'next';
import {getPageContent} from 'lib/api/api';
import {parseBlocks} from 'lib/components/Blocks';
import * as R from 'ramda';

import Container from 'lib/components/layouts/Container';
import Header from 'lib/components/Header';

// article will be populated at build time by getStaticProps()
const Article = (props: PageContent) => {
	const htmlElements = parseBlocks(props.content);
	const meta = props.meta;
	const navigation = meta.navigation;
	return (
		<>
			<Header navItems={navigation}></Header>

			<Container>
				<article className="prose dark:prose-invert lg:prose-xl m-auto"> {htmlElements}</article>
			</Container>
		</>
	);
};

const requestBody = {
	query: 'page("article")',
	select: {
		url: true,
		title: true,
		navigation: 'site.navigation.toNavigationArray',
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
				filename: true,
				dimensions: true
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
	const meta = response.meta;

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
					const findImage = (key: string, value: string, data: []) =>
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
			});
			return blocksWithImagesSrc as Block[];
		};

	const content = addImageUrls(images)(blocks);
	// console.log(Array.isArray(content));
	// console.log(content);
	// const articleContent = content.content;

	// // Props returned will be passed to the page component
	return {
		props: {
			content: content,
			meta: meta
		}
	};
};

export default Article;
