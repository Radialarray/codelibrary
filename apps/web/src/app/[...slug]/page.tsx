import type {Metadata} from 'next';
import {getPageContent} from 'lib/api/api';

import Container from 'lib/components/layouts/Container';
import Header from 'lib/components/Header';
import Breadcrumb from 'lib/components/Breadcrumb';
import Sidebar from 'lib/components/Sidebar';
import Content from 'lib/components/Content';

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
const getData = async (slug: string): Promise<Page> => {
	const pageToQuery = `page("${slug}")`;

	const requestBody = {
		query: pageToQuery,
		select: {
			url: true,
			uri: true,
			title: true,
			id: true,
			navigation: 'site.navigation.toNavigationArray',
			courses: true,
			codelanguages: true,
			level: true,
			categories: true,
			headline: true,
			intro: true,
			content: 'page.content.main.addImagePaths',
			images: {
				query: 'page.images',
				select: {
					url: true,
					filename: true,
					dimensions: true,
					alt: 'file.alt.kirbytext'
				}
			},
			searchPage: {
				query: 'page.children',
				select: {
					url: true,
					uri: true,
					slug: true,
					id: true,
					title: 'page.title'
				}
			},
			searchGlobal: {
				query: 'site.children',
				select: {
					url: true,
					title: true,
					courses: true,
					codelanguages: true,
					level: true,
					categories: true,
					headline: true,
					id: true
				}
			},
			searchAll: {
				query: 'site.index',
				select: {
					url: true,
					title: true,
					courses: true,
					codelanguages: true,
					level: true,
					categories: true,
					headline: true,
					id: true
				}
			}
		},
		pagination: {limit: 10}
	};

	const requestOptions: KQLRequestOptions = {
		method: 'POST',
		body: requestBody,
		redirect: 'follow'
	};

	const response = await getPageContent(requestOptions);

	return {...response};
};

export const generateMetadata = async ({params}: {params: {slug: string}}): Promise<Metadata> => {
	const data = await getData(params.slug[0]);
	if (typeof data.meta !== 'string') {
		return {title: data.meta.title};
	}
	return {title: ''};
};

// article will be populated at build time by getStaticProps()

const Page = async ({params}: {params: {slug: string[]}}): Promise<JSX.Element> => {
	const slug = params.slug.join('/');
	const data = await getData(slug);

	const meta = data.meta as MetaInfo;

	return (
		<>
			<Container>
				<Header meta={meta}></Header>
				<div className="flex w-full mx-auto px-4">
					<Sidebar content={data.content} uri={meta.uri}></Sidebar>
					<article key={'article'} className="flex flex-col gap-12 justify-center">
						<Breadcrumb uri={meta.uri}></Breadcrumb>
						<h1>{typeof data.meta === 'object' ? data.meta.title : 'Missing title'}</h1>
						<Content content={data.content}></Content>
					</article>
				</div>
			</Container>
		</>
	);
};

export default Page;
