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

	// Search for children pages and add them as links to bottom of page
	const chapters = await Promise.all(
		meta.searchInfo.searchChildren.map(async (item: SearchItem): Promise<JSX.Element | null> => {
			const pageToQuery = `page("${item.uri}")`;

			const requestBody = {
				query: pageToQuery,
				select: {
					url: true,
					uri: true,
					title: true,
					summary: true,
					id: true,
					courses: true,
					codelanguages: true,
					level: true,
					categories: true,
					banner: 'page.content.banner.addImagePath'
				}
			};
			const requestOptions: KQLRequestOptions = {
				method: 'POST',
				body: requestBody,
				redirect: 'follow'
			};
			const response = await requestData(requestOptions);

			if (response.status === 'ok') {
				const getCategories = () => {
					if (response.result.categories && response.result.categories.length > 0) {
						const categoriesSplit = response.result.categories.split(',');

						return categoriesSplit.map(item => {
							const itemTrimmed = item.trim();
							return (
								<span
									key={itemTrimmed}
									className="inline-flex items-center justify-center rounded-sm bg-black px-3 py-1 text-white"
								>
									<p className="whitespace-nowrap text-sm">{itemTrimmed}</p>
								</span>
							);
						});
					} else {
						return null;
					}
				};

				const categories = getCategories();

				return (
					<li className="flex-1" key={response.result.id}>
						<Link href={response.result.uri} className="group relative block h-48 sm:h-64 lg:h-64">
							<span className="absolute rounded-sm inset-0 border-2 border-dashed border-black"></span>

							<div className="relative rounded-sm flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
								<div className="relative h-full w-full  transition-opacity group-hover:absolute group-hover:opacity-0 ">
									{response.result.banner ? (
										<div className="absolute w-full h-full z-0">
											<NextImage
												className="object-cover object-center h-full w-full grayscale opacity-20"
												key={response.result.banner.id}
												src={response.result.banner.url}
												alt={'Vorschaubild für die Seite ' + response.result.title}
												width={response.result.banner.width}
												height={response.result.banner.height}
											/>
											<div className="absolute top-0 left-0 w-full h-full bg-highlight mix-blend-multiply"></div>
										</div>
									) : null}

									<div className="absolute bottom-0 w-full p-6 flex justify-between gap-2 z-50 text-black">
										<h2 className="pr-4 text-xl font-medium sm:text-2xl">
											{response.result.title}
										</h2>
										<div className="flex flex-wrap gap-2">{categories}</div>
									</div>
								</div>

								<div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
									<h3 className="mt-4 text-xl font-medium sm:text-2xl">{response.result.title}</h3>

									<p className="mt-4 text-sm sm:text-base line-clamp-3">
										{response.result.summary}
									</p>

									<p className="mt-8 font-bold">Read more</p>
								</div>
							</div>
						</Link>
					</li>
				);
			} else {
				return null;
			}
		})
	);

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
						<Breadcrumb uri={meta.uri}></Breadcrumb>
						<article key={'article'} className="flex flex-col mt-8">
							{typeof data.meta === 'object' && data.meta.summary ? (
								<p className="text-lg mb-8">{data.meta.summary}</p>
							) : null}
							<Content content={data.content}></Content>
						</article>
						{chapters.length ? (
							<nav className="mt-12">
								<h3>Weitere Kapitel</h3>
								<ol className="my-6 w-full flex flex-col sm:flex-row gap-4 sm:gap-2">{chapters}</ol>
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
