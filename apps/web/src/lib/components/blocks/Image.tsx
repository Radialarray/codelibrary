import Link from 'next/link';
import NextImage from 'next/image';

/**
 * Creates a JSX.Element an image block.
 * @param {Block} props
 * @returns {JSX.Element}
 */
const Image = (props: Block): JSX.Element => {
	// console.log(props);

	const content = props.content as ImageContent;

	// if link exists, return image wrapped in link.
	return content.link ? (
		<NextImage
			key={props.id}
			src={content.image[0]}
			alt={content.alt ? content.alt : content.src}
			width="300"
			height="300"
		/>
	) : (
		<Link href={content.link} key={props.id}>
			<NextImage
				src={content.image[0]}
				alt={content.alt ? content.alt : content.src}
				width="300"
				height="300"
			/>
		</Link>
	);
};

export default Image;
