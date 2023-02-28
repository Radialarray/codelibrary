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
const getData = async (): Promise<Page> => {
	const requestBody: KQLRequestBody = {
		query: 'page("overview")',
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

export async function generateMetadata(): Promise<Metadata> {
	const data = await getData();
	if (typeof data.meta !== 'string') {
		return {title: data.meta.title};
	}
	return {title: ''};
}

// article will be populated at build time by getStaticProps()
const Page = async () => {
	const data = await getData();

	const meta = data.meta as MetaInfo;
	return (
		<>
			<Header meta={meta}></Header>

			<Container>
				<div className="flex w-full">
					<Sidebar content={data.content}></Sidebar>
					<article key={'article'} className="flex flex-col gap-12">
						<Breadcrumb uri={meta.uri}></Breadcrumb>
						<Content content={data.content}></Content>
					</article>
				</div>
			</Container>
		</>
	);
};

export default Page;
