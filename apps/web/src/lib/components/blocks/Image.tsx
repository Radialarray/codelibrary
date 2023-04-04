import Link from 'next/link';
import NextImage from 'next/image';

/**
 * Creates a JSX.Element an image block.
 * @param {Block} props
 * @returns {JSX.Element}
 */
const Image = (props: Block): JSX.Element => {
	const content = props.content as ImageContent;

	// if link exists, return image wrapped in link.
	return content.link.length ? (
		<Link href={content.link} key={props.id}>
			<NextImage
				className="my-6 object-contain w-full max-h-[32rem]"
				src={content.image[0].url}
				alt={content.alt ? content.alt : content.src}
				width={content.image[0].dimensions.width}
				height={content.image[0].dimensions.height}
			/>
		</Link>
	) : (
		<NextImage
			key={props.id}
			className="my-6 object-contain w-full max-h-[32rem]"
			src={content.image[0].url}
			alt={content.alt ? content.alt : content.src}
			width={content.image[0].dimensions.width}
			height={content.image[0].dimensions.height}
		/>
	);
};

export default Image;
