import type {Metadata} from 'next';
import {requestData} from 'lib/api/api';
import Container from 'lib/components/layouts/Container';
import Header from 'lib/components/Header';
import Breadcrumb from 'lib/components/Breadcrumb';
import Sidebar from 'lib/components/Sidebar';
import Content from 'lib/components/Content';
import SidebarMetadata from 'lib/components/SidebarMetadata';
import Chapters from 'lib/components/Chapters';
import Banner from 'lib/components/Banner';

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
const getData = async (slug: string): Promise<KQLResponse> => {
	const requestBody = {
		query: "page('library')",
		select: {
			meta: {
				query: 'page',
				select: {
					url: true,
					uri: true,
					title: true,
					summary: true,
					id: true,
					navigation: 'site.navigation.toNavigationArray',
					courses: true,
					codelanguages: true,
					level: true,
					categories: true,
					banner: 'page.content.banner.addImagePath',
					modified: "page.modified('d.m.Y')",
					author: 'page.author.getAuthorName',
					search: {
						query: 'page',
						select: {
							children: {
								query: 'page.children',
								select: {
									url: true,
									uri: true,
									slug: true,
									id: true,
									title: 'page.title'
								}
							},
							global: {
								query: 'site.children',
								select: {
									url: true,
									title: true,
									courses: true,
									codelanguages: true,
									level: true,
									categories: true,
									id: true
								}
							},
							all: {
								query: 'site.index',
								select: {
									url: true,
									title: true,
									courses: true,
									codelanguages: true,
									level: true,
									categories: true,
									id: true
								}
							}
						}
					}
				}
			},
			content: 'page.content.main.addImagePathsToLayout',
			images: {
				query: 'page.images',
				select: {
					url: true,
					filename: true,
					dimensions: true,
					alt: 'file.alt.kirbytext'
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

	const response = await requestData(requestOptions);

	return {...response};
};

export const generateMetadata = async ({params}: {params: {slug: string[]}}): Promise<Metadata> => {
	const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

	const data = await getData(slug);

	if (typeof data.result.meta !== 'string') {
		return {title: data.result.meta.title};
	}
	return {title: ''};
};

const Page = async ({params}: {params: {slug: string[]}}): Promise<JSX.Element> => {
	const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
	const data = await getData(slug);

	const meta = data.result.meta;
	return (
		<>
			<Container className="bg-light-gray min-h-full">
				<Header meta={meta}></Header>
				<div className="relative">
					<Banner home={false} meta={meta}></Banner>
					<div className="relative mx-auto lg:max-w-5xl px-12 -mt-28">
						<div className="relative -ml-8 sm:-ml-16 min-h-[174px] w-full sm:w-min sm:min-w-[500px] p-8 flex items-end">
							<div className="absolute top-0 left-0 w-full h-full bg-black shadow-md"></div>
							<h1 className="relative text-white">
								{typeof meta === 'object' ? meta.title : 'Missing title'}
							</h1>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-12">
					<Sidebar content={data.result.content} uri={meta.uri}></Sidebar>
					<div className="col-start-2 md:col-start-3 col-span-10 md:col-span-8 md:px-8 mt-4">
						<Breadcrumb uri={meta.uri}></Breadcrumb>
						<article key={'article'} className="flex flex-col mt-8">
							{typeof meta === 'object' && meta.summary ? (
								<p className="text-lg mb-8">{meta.summary}</p>
							) : null}
							<Content content={data.result.content}></Content>
						</article>
						{meta.search && meta.search.children && meta.search.children.length > 0 ? (
							<nav className="mt-12">
								<h3>Alle Kategorien</h3>
								{/* @ts-expect-error Async Server Component */}
								<Chapters pageChildren={meta.search.children}></Chapters>
							</nav>
						) : null}
					</div>
					<SidebarMetadata meta={meta}></SidebarMetadata>
				</div>
			</Container>
		</>
	);
};

export default Page;
