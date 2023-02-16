import {getPageContent} from 'lib/api/api';

import Container from 'lib/components/layouts/Container';
import Header from 'lib/components/Header';
import Breadcrumb from 'lib/components/Breadcrumb';
import Sidebar from 'lib/components/Sidebar';
import {parseContent} from 'lib/components/Layouts';

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getData = async (): Promise<Page> => {
	const requestBody: KQLRequestBody = {
		query: 'page("overview")',
		select: {
			url: true,
			title: true,
			navigation: 'site.navigation.toNavigationArray',
			courses: true,
			codelanguages: true,
			level: true,
			categories: true,
			headline: true,
			intro: true,
			content: 'page.content.main',
			images: {
				query: 'page.images',
				select: {
					url: true,
					filename: true,
					dimensions: true
				}
			},
			search: {
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

// article will be populated at build time by getStaticProps()
const Page = async () => {
	const data = await getData();

	const htmlElements = parseContent(data.content);
	if (htmlElements === undefined) {
		throw new Error('Something went wrong when parsing content!');
	}
	const meta = data.meta as MetaInfo;
	const navigation = meta.navigation;
	const search = meta.search;
	return (
		// <h1>geakgaje</h1>
		<>
			<Header navItems={navigation} searchItems={search}></Header>

			<div className="flex">
				<aside>
					<Sidebar content={data.content}></Sidebar>
				</aside>
				<Container>
					<Breadcrumb url={meta.url}></Breadcrumb>
					<article key={'article'} className="prose dark:prose-invert lg:prose-xl m-auto">
						{htmlElements}
					</article>
				</Container>
			</div>
		</>
	);
};

export default Page;
