import * as R from 'ramda';
import htmlReactParser, {
	attributesToProps,
	HTMLReactParserOptions,
	Element
} from 'html-react-parser';
import React, {ReactNode} from 'react';
/**
 * Parses blocks from block content editor data from KQL response.
 * @param {PageContent} data
 * @returns {HTMLElement[]}
 */
export const parseBlocks = (data: PageContent): JSX.Element[] => {
	const blocks = data.content;
	// console.log(blocks);
	return R.map(parseBlock, blocks);
};

/**
 * Creates a JSX.Element from KQL Type Text Response.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const parseText = (x: Block) => {
	const element = htmlReactParser((x.content as TextContent).text);
	const keyedElement = {...(element as object), key: x.id};
	return keyedElement;
};

/**
 * Creates a JSX.Element from KQL Type Text Response.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const parseHeading = (x: Block) => {
	return React.createElement(
		(x.content as TextContent).level || 'h1',
		{key: x.id},
		(x.content as TextContent).text
	);
};

// TODO: Should return react components.
/**
 * Checks for block type and then calls the respective component.
 */
const parseBlock = R.cond<Block[], any>([
	[x => R.equals('code', x.type), R.always('code')],
	[x => R.equals('gallery', x.type), R.always('gallery')],
	[x => R.equals('heading', x.type), parseHeading],
	[x => R.equals('image', x.type), R.always('image')],
	[x => R.equals('line', x.type), R.always('line')],
	[x => R.equals('list', x.type), R.always('list')],
	[x => R.equals('markdown', x.type), R.always('markdown')],
	[x => R.equals('quote', x.type), R.always('quote')],
	[x => R.equals('text', x.type), parseText],
	[x => R.equals('video', x.type), R.always('video')]
]);
