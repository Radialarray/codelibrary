import type {Metadata} from 'next';
import {getPageContent} from 'lib/api/api';

import Container from 'lib/components/layouts/Container';
import Header from 'lib/components/Header';
import Content from 'lib/components/Content';
import Banner from 'lib/components/Banner';
import Sidebar from 'lib/components/Sidebar';
import Footer from 'lib/components/Footer';
import ButtonLink from 'lib/components/ButtonLink';
import Highlights from 'lib/components/Highlights';

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
const getData = async (): Promise<KQLResponse> => {
	const requestBody = {
		query: "page('home')",
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
			navigation: 'site.navigation.toNavigationArray',
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
			highlightArticles: {
				query: 'site.index',
				select: {
					uri: true,
					title: true,
					highlight: true,
					banner: 'page.content.banner.addImagePath',
					id: true,
					categories: true
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

	return response;
};

export async function generateMetadata(): Promise<Metadata> {
	const data = await getData();
	if (typeof data.result.meta !== 'string') {
		return {title: data.result.meta.title};
	}
	return {title: ''};
}

// article will be populated at build time by getStaticProps()
const Page = async (): Promise<JSX.Element> => {
	const data = await getData();

	const meta = data.result.meta;

	const divStyle = {
		backgroundImage:
			'repeating-linear-gradient(0deg, #000000, #000000 11px, transparent 11px, transparent 21px, #000000 21px), repeating-linear-gradient(90deg, #000000, #000000 11px, transparent 11px, transparent 21px, #000000 21px), repeating-linear-gradient(180deg, #000000, #000000 11px, transparent 11px, transparent 21px, #000000 21px), repeating-linear-gradient(270deg, #000000, #000000 11px, transparent 11px, transparent 21px, #000000 21px)',
		backgroundSize: '2px 100%, 100% 2px, 2px 100% , 100% 2px',
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
							<h1>
								<b>Code</b>
								<span className="font-normal">Lab</span>
							</h1>
							{typeof meta === 'object' && meta.summary ? (
								<p className="text-lg mb-8">{meta.summary}</p>
							) : null}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-12">
					<Sidebar content={data.result.content} uri={meta.uri}></Sidebar>
					<div className="col-start-2 md:col-start-3 col-span-10 md:col-span-8 md:px-8 mt-4">
						<article key={'article'} className="flex flex-col mt-8 gap-12">
							{'highlightArticles' in data.result &&
							Array.isArray(data.result.highlightArticles) ? (
								<Highlights highlights={data.result.highlightArticles}></Highlights>
							) : null}
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
								<div className="mb-4 bg-light-gray px-5 py-8" style={divStyle}>
									<h3 className="text-xl mb-2">Interesse an der HfG zu studieren?</h3>
									<div className="flex flex-col md:flex-row justify-between gap-6">
										<p>
											Arduino wird für Projekte mit Hardware genutzt. Du kannst in kurzer Zeit viele
											Ideen prototypisch umsetzen und Dinge zum Anfassen bauen.
										</p>
										<ButtonLink href="" dark={true} external={true}>
											<p>Zur HfG Website</p>
										</ButtonLink>
									</div>
								</div>
							</section>
							<Content content={data.result.content}></Content>
						</article>
					</div>
				</div>
				<Footer></Footer>
			</Container>
		</>
	);
};

export default Page;
