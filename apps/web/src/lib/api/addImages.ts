import * as R from 'ramda';

export const augmentImageSrc = (block: Block, images: Image[]) => {
	// console.log(images);

	if (block.type === 'image') {
		const content = block.content;

		// console.log(block);
		// console.log(images);
		const imageSrc = R.find(R.propEq('filename', (block.content as ImageContent).image[0]))(images);
		// console.log(imageSrc);

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

		// console.log(content.images);

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

export const addImageSources = (page: Page) => {
	if (page === undefined || typeof page.content === 'string') {
		throw new Error('Page is undefined!');
	}

	const augmentedBlocks = page.content.map(content => {
		if (R.has('columns')(content)) {
			const columns = content.columns.map(column => {
				const blocks = column.blocks.map(block => {
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
