import type {Metadata} from 'next';
import {getPageContent} from 'lib/api/api';

import Container from 'lib/components/layouts/Container';
import Header from 'lib/components/Header';
import Breadcrumb from 'lib/components/Breadcrumb';
import Sidebar from 'lib/components/Sidebar';
import Content from 'lib/components/Content';
import Link from 'next/link';
import NextImage from 'next/image';

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
			banner: 'page.content.banner.addImagePath',
			intro: true,
			content: 'page.content.main.addImagePathsToLayout',
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
	// console.log(data.meta.search.searchPage);

	const chapters = data.meta.search.searchPage.map((item: SearchItem): JSX.Element => {
		return (
			<li key={item.id}>
				<Link className="underline" href={item.uri}>
					{item.title}
				</Link>
			</li>
		);
	});

	// console.log(data.meta.banner);

	return (
		<>
			<Container className="bg-light-gray">
				<Header meta={meta}></Header>
				<div className="relative">
					<div className="relative w-full h-[500px]">
						<NextImage
							src={meta.banner.url}
							width={'1200'}
							height={'200'}
							alt={meta.banner.filename}
							priority={true}
							className="grayscale object-cover h-full w-full"
						></NextImage>
						<div className="absolute top-0 left-0 w-full h-full bg-highlight mix-blend-multiply"></div>
					</div>
					<div className="relative mx-auto lg:max-w-5xl px-12 -mt-28">
						<div className="relative -ml-16 min-h-[174px] min-w-[500px] p-8 w-min flex items-end">
							<div className="absolute top-0 left-0 w-full h-full bg-black shadow-md"></div>
							<h1 className="relative text-white">
								{typeof data.meta === 'object' ? data.meta.title : 'Missing title'}
							</h1>
						</div>
					</div>
				</div>

				<Sidebar className="absolute ml-6" content={data.content} uri={meta.uri}></Sidebar>
				<div className="mx-auto mt-32 lg:max-w-5xl px-12">
					<article key={'article'} className="flex flex-col">
						<Breadcrumb uri={meta.uri}></Breadcrumb>
						<Content content={data.content}></Content>
					</article>
					{chapters.length ? (
						<nav>
							<h3>Weitere Kapitel</h3>
							<ol>{chapters}</ol>
						</nav>
					) : null}
				</div>
			</Container>
		</>
	);
};

export default Page;
