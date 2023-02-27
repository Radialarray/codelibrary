import Heading from './blocks/Heading';
import Text from './blocks/Text';
import Quote from './blocks/Quote';
import List from './blocks/List';
import Image from './blocks/Image';
import Gallery from './blocks/Gallery';
import Video from './blocks/Video';
import Code from './blocks/Code';
import Markdown from './blocks/Markdown';
import Line from './blocks/Line';

/**
 * Checks for block type and then calls the respective component.
 */
export const parseBlock = (block: Block): JSX.Element => {
	// console.log(block);
	switch (block.type) {
		case 'code':
			return <Code key={block.id} {...block} />;
		case 'gallery':
			return <Gallery key={block.id} {...block} />;
		case 'heading':
			return <Heading key={block.id} {...block} />;
		case 'image':
			// eslint-disable-next-line jsx-a11y/alt-text
			return <Image key={block.id} {...block} />;
		case 'line':
			return <Line key={block.id} {...block} />;
		case 'list':
			return <List key={block.id} {...block} />;
		case 'markdown':
			return <Markdown key={block.id} {...block} />;
		case 'quote':
			return <Quote key={block.id} {...block} />;
		case 'text':
			return <Text key={block.id} {...block} />;
		case 'video':
			return <Video key={block.id} {...block} />;
		default:
			return <p>Error, empty block</p>;
	}
};

/**
 * Parses blocks from block content editor data from KQL response.
 * @param {Block[]} blocks
 * @returns {JSX.Element[]}
 */
// export const parseBlocks = ({content}: PageContent): JSX.Element[] => {
export const parseBlocks = (blocks: Block[]): JSX.Element[] => {
	if (blocks !== undefined) return blocks.map(parseBlock);
	return [<p>Something happened.</p>];
};
