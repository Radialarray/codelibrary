import Link from 'next/link';
import NextImage from 'next/image';
import * as R from 'ramda';

/**
 * Creates a JSX.Element an image block.
 * @param {Block} props
 * @returns {JSX.Element}
 */
const Image = (props: Block): JSX.Element => {
	const content = props.content as ImageContent;

	// if link exists, return image wrapped in link.
	return R.isNil(content.link) ? (
		<NextImage
			key={props.id}
			src={content.src}
			alt={content.alt ? content.alt : content.src}
			layout="responsive"
			width={content.width}
			height={content.height}
			// objectFit="cover"
		/>
	) : (
		<Link href={content.link} key={props.id}>
			<NextImage
				src={content.src}
				alt={content.alt ? content.alt : content.src}
				layout="responsive"
				width={content.width}
				height={content.height}
				// objectFit="cover"
			/>
		</Link>
	);
};

export default Image;
