import type {NextPage} from 'next';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getPageContent, queryContent} from '../lib/api';
import axios from 'axios';
import htmlReactParser from 'html-react-parser';
import {parseBlocks} from '../lib/blocks';
import * as R from 'ramda';
import Code from '../components/Code';

// article will be populated at build time by getStaticProps()
const Article: NextPage = props => {
	// console.log(data);
	// const article = JSON.parse(data.result.content);
	// // article.map((value: string) => {
	// // 	console.log(value);
	// // });
	// const blocks = article.map((block: KQLResponseBlock) => {
	// 	if (block.type === 'text') {
	// 		console.log('hello');
	// 		return <li key={block.id}>{htmlReactParser(block.content.text!)}</li>;
	// 	}
	// });
	const test = props as Block[];
	console.log(test);
	R.map(console.log, test);
	// return <ul>{blocks}</ul>;
	// return <ul>Hello</ul>;
	return (
		<ul>
			<Code></Code>
		</ul>
	);
};

const requestBody = {
	query: 'page("article")',
	select: {
		url: true,
		title: true,
		courses: true,
		codelanguages: true,
		level: true,
		categories: true,
		headline: true,
		intro: true,
		content: 'page.content.main'
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
// export async function getStaticProps() {
// 	// const data: KQLResponse = await handler(requestOptions);

// 	const blocks = await getPageContent(requestOptions);
// 	const htmlElements = await parseBlocks(blocks);

// 	// const articleContent = data.content;
// 	// // Props returned will be passed to the page component
// 	return {
// 		props: {htmlElements}
// 	};
// }

export default Article;
