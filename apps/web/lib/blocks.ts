import * as R from 'ramda';
import htmlReactParser from 'html-react-parser';
import {createElement, Fragment, useEffect, useState} from 'react';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import remarkCodeHike from '@code-hike/mdx';
import theme from 'shiki/themes/nord.json';
/**
 * Parses blocks from block content editor data from KQL response.
 * @param {PageContent} data
 * @returns {HTMLElement[]}
 */
export const parseBlocks = async (data: PageContent): Promise<HTMLElement[]> => {
	const blocks = data.content;

	// const blocksParsed = R.map(parseBlock, blocks);

	return blocks;
};

// TODO: Should return react components.
/**
 * Checks for block type and then calls the respective component.
 */
const parseBlock = R.cond<Block[], String>([
	[x => R.equals('code', x.type), R.always('code')],
	[x => R.equals('gallery', x.type), R.always('gallery')],
	[x => R.equals('heading', x.type), R.always('heading')],
	[x => R.equals('image', x.type), R.always('image')],
	[x => R.equals('line', x.type), R.always('line')],
	[x => R.equals('list', x.type), R.always('list')],
	[x => R.equals('markdown', x.type), R.always('markdown')],
	[x => R.equals('quote', x.type), R.always('quote')],
	[x => R.equals('text', x.type), R.always('text')],
	[x => R.equals('video', x.type), R.always('video')]
]);

const x: Block = {
	content: {
		code:
			'Keyboard.write(65);         // sends ASCII value 65, or A\n' +
			"Keyboard.write('A');            // same thing as a quoted character\n" +
			'Keyboard.write(0x41);       // same thing in hexadecimal',
		language: 'cpp'
	},
	id: '6b6f0b2e-a01f-4c7e-94bc-289dc6aad76c',
	isHidden: false,
	type: 'code'
};

const parseCode = (x: Block) => {
	const codeString = `\`\`\`${x.content.language}
${x.content.code}
\`\`\``;
	console.log(codeString);

	const reactNode = unified()
		.use(remarkParse)
		.use([remarkCodeHike, {theme}])
		.use(remarkRehype)
		.use(rehypeFormat)
		.use(rehypeStringify)
		.use(rehypeParse)
		.process(codeString)
		.then(file => {
			console.log(file);
		});

	// return htmlReactParser(JSON.parse(x.content));
	return htmlReactParser(JSON.parse(x.content));
};

console.log(parseCode(x));

const parseText = (x: Block) => {
	return htmlReactParser(JSON.parse(x.content.text));
};
