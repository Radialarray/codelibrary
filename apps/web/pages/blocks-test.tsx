import {GetStaticProps} from 'next';
import type {NextPage} from 'next';
import {getPageContent, queryContent} from '../lib/api';
import {parseBlocks} from '../components/block';
import React from 'react';
import R from 'ramda';

// article will be populated at build time by getStaticProps()
const BlocksTest = ({content}: PageContent) => {
	const elements = parseBlocks(content);
	return <>{elements}</>;
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
export async function getStaticProps() {
	// const data: KQLResponse = await handler(requestOptions);

	const content = await getPageContent(requestOptions);

	// // Props returned will be passed to the page component
	return {
		props: {content}
	};
}

export default BlocksTest;
