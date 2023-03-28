import {useState, useEffect} from 'react';
import type {Metadata} from 'next';
import {getPageContent, requestData} from 'lib/api/api';
import Container from 'lib/components/layouts/Container';
import Header from 'lib/components/Header';
import Breadcrumb from 'lib/components/Breadcrumb';
import Sidebar from 'lib/components/Sidebar';
import Content from 'lib/components/Content';
import Link from 'next/link';
import NextImage from 'next/image';
import SidebarMetadata from 'lib/components/SidebarMetadata';
import Chapters from 'lib/components/Chapters';

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
			summary: true,
			id: true,
			navigation: 'site.navigation.toNavigationArray',
			courses: true,
			codelanguages: true,
			level: true,
			categories: true,
			// headline: true,
			banner: 'page.content.banner.addImagePath',
			intro: true,
			modified: "page.modified('d.m.Y')",
			author: 'page.author.getAuthorName',
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
			searchChildren: {
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
					// headline: true,
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
					// headline: true,
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

export const generateMetadata = async ({params}: {params: {slug: string[]}}): Promise<Metadata> => {
	const slug = params.slug.join('/');

	const data = await getData(slug);

	if (typeof data.meta !== 'string') {
		return {title: data.meta.title};
	}
	return {title: ''};
};

const Page = async ({params}: {params: {slug: string[]}}): Promise<JSX.Element> => {
	const slug = params.slug.join('/');
	const data = await getData(slug);

	const meta = data.meta as MetaInfo;

	const Banner = () => {
		if (meta.banner && meta.banner.url) {
			return (
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
			);
		} else {
			return (
				<div className="relative w-full h-[500px]">
					<div className="absolute top-0 left-0 w-full h-full bg-highlight mix-blend-multiply"></div>
				</div>
			);
		}
	};

	return (
		<>
			<Container className="bg-light-gray min-h-full">
				<Header meta={meta}></Header>
				<div className="relative">
					<Banner></Banner>
					<div className="relative mx-auto lg:max-w-5xl px-12 -mt-28">
						<div className="relative -ml-8 sm:-ml-16 min-h-[174px] w-full sm:w-min sm:min-w-[500px] p-8 flex items-end">
							<div className="absolute top-0 left-0 w-full h-full bg-black shadow-md"></div>
							<h1 className="relative text-white">
								{typeof data.meta === 'object' ? data.meta.title : 'Missing title'}
							</h1>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-12">
					<Sidebar content={data.content} uri={meta.uri}></Sidebar>
					<div className="col-start-2 md:col-start-3 col-span-10 md:col-span-8 md:px-8 mt-4">
						{/* <Breadcrumb uri={meta.uri}></Breadcrumb> */}
						<article key={'article'} className="flex flex-col mt-8">
							{typeof data.meta === 'object' && data.meta.summary ? (
								<p className="text-lg mb-8">{data.meta.summary}</p>
							) : null}
							<Content content={data.content}></Content>
						</article>
						{meta.searchInfo &&
						meta.searchInfo.searchChildren &&
						meta.searchInfo.searchChildren.length > 0 ? (
							<nav className="mt-12">
								<h3>Weitere Kapitel</h3>
								{/* @ts-expect-error Async Server Component */}
								<Chapters pageChildren={meta.searchInfo.searchChildren}></Chapters>
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
