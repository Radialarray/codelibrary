import NextImage from 'next/image';
import * as R from 'ramda';

/**
 * Creates a JSX.Element an image block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Image = (x: Block): JSX.Element => {
	const content = x.content as ImageContent;
	// if link exists, return image wrapped in link.
	return R.isNil(content.link) ? (
		<NextImage
			key={x.id}
			src={content.url}
			alt={content.alt}
			layout="intrinsic"
			width="500"
			height="200"
			objectFit="cover"
		/>
	) : (
		<a href={content.link} key={x.id}>
			<NextImage
				key={'image'}
				src={content.url}
				alt={content.alt}
				layout="intrinsic"
				width="500"
				height="200"
				objectFit="cover"
			/>
		</a>
	);
};

export default Image;
