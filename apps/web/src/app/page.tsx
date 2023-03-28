import type {Metadata} from 'next';
import {getPageContent} from 'lib/api/api';

import Container from 'lib/components/layouts/Container';
import Header from 'lib/components/Header';
import Content from 'lib/components/Content';
import Banner from 'lib/components/Banner';
import Sidebar from 'lib/components/Sidebar';
import Breadcrumb from 'lib/components/Breadcrumb';
import Card from 'lib/components/Card';
import Link from 'next/link';
import Footer from 'lib/components/Footer';
import ButtonLink from 'lib/components/ButtonLink';

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
const getData = async (): Promise<Page> => {
	const requestBody = {
		query: 'page("home")',
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
const Page = async (): Promise<JSX.Element> => {
	const data = await getData();

	const meta = data.meta as MetaInfo;

	const divStyle = {
		backgroundImage:
			'repeating-linear-gradient(0deg, #000000, #000000 11px, transparent 11px, transparent 21px, #000000 21px), repeating-linear-gradient(90deg, #000000, #000000 11px, transparent 11px, transparent 21px, #000000 21px), repeating-linear-gradient(180deg, #000000, #000000 11px, transparent 11px, transparent 21px, #000000 21px), repeating-linear-gradient(270deg, #000000, #000000 11px, transparent 11px, transparent 21px, #000000 21px)',
		backgroundSize: '3px 100%, 100% 3px, 3px 100% , 100% 3px',
		backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
		backgroundRepeat: 'no-repeat'
	};

	return (
		<>
			<Container>
				<Header meta={meta}></Header>
				<div className="relative">
					<Banner home={true} meta={meta}></Banner>
					<div className="absolute top-1/2 px-12">
						<div className="flex flex-col items-start text-white">
							<h1>{typeof data.meta === 'object' ? data.meta.title : 'Missing title'}</h1>
							{typeof data.meta === 'object' && data.meta.summary ? (
								<p className="text-lg mb-8">{data.meta.summary}</p>
							) : null}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-12">
					<Sidebar content={data.content} uri={meta.uri}></Sidebar>
					<div className="col-start-2 md:col-start-3 col-span-10 md:col-span-8 md:px-8 mt-4">
						<article key={'article'} className="flex flex-col mt-8 gap-12">
							<section>
								<h2 className="mb-6">Highlights</h2>
								<div className="flex grow gap-6 w-full">
									<Card></Card>
									<Card></Card>
									<Card></Card>
								</div>
							</section>
							<section>
								<div>
									<h2 className="mb-6">Kategorien</h2>
									<div>
										<p>Suche nach interessanten Artikeln: </p>
										<div>Search</div>
									</div>
								</div>
								<div>
									<h3>Arduino</h3>
									<p>
										Arduino wird für Projekte mit Hardware genutzt. Du kannst in kurzer Zeit viele
										Ideen prototypisch umsetzen und Dinge zum Anfassen bauen.
									</p>
									<ButtonLink href="">
										<p>Zu Arduino</p>
									</ButtonLink>
								</div>
							</section>
							<section>
								<div className="mb-4 bg-light-gray px-4 py-6" style={divStyle}>
									<h3>Interesse an der HfG zu studieren?</h3>
									<p>
										Arduino wird für Projekte mit Hardware genutzt. Du kannst in kurzer Zeit viele
										Ideen prototypisch umsetzen und Dinge zum Anfassen bauen.
									</p>
									<ButtonLink href="" dark={true} external={true}>
										<p>Zur HfG Website</p>
									</ButtonLink>
								</div>
							</section>
							<Content content={data.content}></Content>
						</article>
					</div>
				</div>
				<Footer></Footer>
			</Container>
		</>
	);
};

export default Page;
