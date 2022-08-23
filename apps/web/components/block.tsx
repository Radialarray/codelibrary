import * as R from 'ramda';
import htmlReactParser from 'html-react-parser';
import Image from 'next/image';
// Isomorphic dompurify, so it can run on server and browser.
import DOMPurify from 'isomorphic-dompurify';
import React, {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Sandpack} from '@codesandbox/sandpack-react';
import {githubLight, sandpackDark} from '@codesandbox/sandpack-themes';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';

// Dynamic import so that no render mismatch happens, because reactplayer uses window right now, so no serverside rendering for this component.
const ReactPlayer = dynamic(() => import('react-player/lazy'), {ssr: false});

import 'swiper/css';
/**
 * Parses blocks from block content editor data from KQL response.
 * @param {PageContent} data
 * @returns {HTMLElement[]}
 */
export const parseBlocks = (props: PageContent): JSX.Element[] => {
	// for every block in blocks paste as parameter to parseBlock()
	return R.map(parseBlock, props.data);
};

// Dompurify Options
const dompurifyDefaultOptions = {
	ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'code', 'li', 'br', 'p'],
	ALLOWED_ATTR: ['href']
};

/**
 * Given dirty html, returns sanitized html.
 * @param dirty
 * @param options
 * @returns
 */
const sanitize = (dirty: string, options?: object) => ({
	__html: DOMPurify.sanitize(dirty, {...dompurifyDefaultOptions, ...options})
});

/**
 * Creates a JSX.Element from a text block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const parseText = (x: Block): JSX.Element => {
	// const element = htmlReactParser((x.content as TextContent).text);
	// const keyedElement = {...(element as object), key: x.id};
	// return keyedElement;
	const sanitized = sanitize((x.content as TextContent).text);
	return <div key={x.id}>{htmlReactParser(sanitized.__html)}</div>;
};

/**
 * Creates a JSX.Element from a heading block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const parseHeading = (x: Block): JSX.Element => {
	return React.createElement(
		(x.content as TextContent).level || 'h1',
		{key: x.id},
		(x.content as TextContent).text
	);
};

/**
 * Creates a JSX.Element from a quote block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const parseQuote = (x: Block): JSX.Element => {
	return (
		<figure key={x.id}>
			<blockquote
				cite={(x.content as QuoteContent).citation}
				dangerouslySetInnerHTML={sanitize((x.content as QuoteContent).text)}
			></blockquote>
			<figcaption>{(x.content as QuoteContent).citation}</figcaption>
		</figure>
	);
};

/**
 * Creates a JSX.Element from a list block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const parseList = (x: Block): JSX.Element => {
	const sanitized = sanitize((x.content as TextContent).text);
	return <ul key={x.id}>{htmlReactParser(sanitized.__html)}</ul>;
};

/**
 * Creates a JSX.Element an image block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const parseImage = (x: Block): JSX.Element => {
	const content = x.content as ImageContent;
	// if link exists, return image wrapped in link.
	return R.isNil(content.link) ? (
		<Image
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
			<Image
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

/**
 * Creates a JSX.Element from a video block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const parseVideo = (props: Block): JSX.Element => {
	return <ReactPlayer key={props.id} url={(props.content as VideoContent).url} />;
};

/**
 * Creates a JSX.Element from a line block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const parseLine = (props: Block): JSX.Element => {
	return <hr key={props.id} />;
};

/**
 * Creates a JSX.Element from a gallery block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const parseGallery = (props: Block): JSX.Element => {
	const slides = (props.content as GalleryContent).images.map(x => {
		return (
			<SwiperSlide key={x.url}>
				<Image
					key={`${x.url}-img`}
					src={x.url}
					alt={x.filename}
					layout="intrinsic"
					width="500"
					height="200"
					objectFit="cover"
				/>
			</SwiperSlide>
		);
	});

	return (
		<Swiper key={props.id} spaceBetween={50} slidesPerView={3}>
			{slides}
		</Swiper>
	);
};

/**
 * Creates a JSX.Element from a code block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const parseCode = (props: Block): JSX.Element => {
	// TODO: Syntax Highlighting for everything
	const basicHighlighting = x => {
		const codeString = x.content.code;
		return (
			<SyntaxHighlighter key={props.id} language={x.content.language} style={dark}>
				{codeString}
			</SyntaxHighlighter>
		);
	};

	// TODO: Basic readonly code viewer for HTML,CSS,JS
	const basicInteractiveSandbox = (props: Block) => {
		return (
			<div>
				<Sandpack
					kkey={props.id}
					options={{readOnly: true}}
					theme={sandpackDark}
					template="vanilla"
					files={{
						'/src/index.cpp': (props.content as CodeContent).code,
						'/src/index2.ts': (props.content as CodeContent).code,
						[`/src/index4.${(props.content as CodeContent).language}`]: (
							props.content as CodeContent
						).code
					}}
				/>
			</div>
		);
	};

	// TODO: Interactive viewer: P5JS usw.
	const fullInteractiveSandbox = (props: Block) => {
		return (
			<div>
				<Sandpack
					key={props.id}
					options={{readOnly: true}}
					theme={sandpackDark}
					template="vanilla"
					files={{
						'/src/index.js': (props.content as CodeContent).code
					}}
				/>
			</div>
		);
	};

	const selectCodeEnvironment = R.cond<Block[], JSX.Element>([
		[x => R.equals('js', (x.content as CodeContent).language), basicInteractiveSandbox],
		[x => R.equals('html', (x.content as CodeContent).language), basicInteractiveSandbox],
		[x => R.equals('css', (x.content as CodeContent).language), basicInteractiveSandbox],
		[x => R.equals('json', (x.content as CodeContent).language), basicInteractiveSandbox],
		[x => R.equals('markdown', (x.content as CodeContent).language), basicInteractiveSandbox],
		[x => R.equals('scss', (x.content as CodeContent).language), basicInteractiveSandbox],
		[x => R.equals('sass', (x.content as CodeContent).language), basicInteractiveSandbox],
		[R.T, basicHighlighting]
	]);

	const codeBlock = selectCodeEnvironment(props);

	return codeBlock;
};

/**
 * Consumes a markdown string and return JSX.Elements, appropriate to the content.
 * @param {Block} props
 * @returns
 */
const parseMarkdown = (props: Block) => {
	// return <ReactMarkdown key={props.id}>{(props.content as TextContent).text}</ReactMarkdown>;
	return (
		<ReactMarkdown
			components={{
				code({node, inline, className, children, ...props}) {
					const match = /language-(\w+)/.exec(className || '');
					return !inline && match ? (
						<SyntaxHighlighter style={dark} language={match[1]} PreTag="div" {...props}>
							{String(children).replace(/\n$/, '')}
						</SyntaxHighlighter>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				}
			}}
		>
			{(props.content as TextContent).text}
		</ReactMarkdown>
	);
};

/**
 * Checks for block type and then calls the respective component.
 */
const parseBlock = R.cond<Block[], JSX.Element | string>([
	[x => R.equals('code', x.type), parseCode],
	[x => R.equals('gallery', x.type), parseGallery],
	[x => R.equals('heading', x.type), parseHeading],
	[x => R.equals('image', x.type), parseImage],
	[x => R.equals('line', x.type), parseLine],
	[x => R.equals('list', x.type), parseList],
	[x => R.equals('markdown', x.type), parseMarkdown],
	[x => R.equals('quote', x.type), parseQuote],
	[x => R.equals('text', x.type), parseText],
	[x => R.equals('video', x.type), parseVideo]
]);
