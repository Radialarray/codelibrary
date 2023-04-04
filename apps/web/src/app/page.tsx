import type {Metadata} from 'next';
import {getPageContent} from 'lib/api/api';
import Container from 'lib/components/layouts/Container';
import Header from 'lib/components/Header';
import Content from 'lib/components/Content';
import Banner from 'lib/components/Banner';
import Sidebar from 'lib/components/Sidebar';
import ButtonLink from 'lib/components/ButtonLink';
import Highlights from 'lib/components/Highlights';
import slugify from '@sindresorhus/slugify';

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
			},
			categories: {
				query: 'site.categories.toStructure'
			},
			articles: {
				query: 'site.index',
				select: {
					title: true,
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

	const categories = data.result.categories;

	const articles = data.result.articles;
	// console.log(categories);
	// console.log(articles);

	interface Item {
		title: string;
		categories: string;
	}

	const sortByFrequency = (items: Item[]) => {
		const categoryCounts = new Map<string, number>();

		// Count the frequency of each category
		items.forEach(item => {
			const categories = item.categories.split(', ');
			categories.forEach(category => {
				const count = categoryCounts.get(category) || 0;
				categoryCounts.set(category, count + 1);
			});
		});
		return categoryCounts;
	};

	const sortMapDescending = (map: Map<string, number>): Map<string, number> => {
		const sortedEntries = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
		return new Map(sortedEntries);
	};

	const sortCategories = (items: Item[]): Array<{id: string; frequency: number}> => {
		const byFrequency = sortByFrequency(items);
		const byDescending = sortMapDescending(byFrequency);
		const asArray = Array.from(byDescending, ([id, frequency]) => ({id, frequency}));
		return asArray;
	};

	const sortedArticlesByCategory = sortCategories(articles);

	const createCategorySections = (
		categories: Array<{description: string; id: string; title: string}>,
		sortedCategories: Array<{id: string; frequency: number}>
	) => {
		const categorySections = sortedCategories.map(category => {
			const existingCategories = categories.find(element => {
				if (category.id === element.id) {
					return element;
				} else {
					return null;
				}
			});

			if (existingCategories === undefined) {
				return null;
			} else {
				return existingCategories;
			}
		});
		return categorySections;
	};

	const categorySection = createCategorySections(categories, sortedArticlesByCategory);

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
						<article key={'article'} className="flex flex-col mt-8 gap-16">
							{'highlightArticles' in data.result &&
							Array.isArray(data.result.highlightArticles) ? (
								<Highlights
									categories={categories}
									highlights={data.result.highlightArticles}
								></Highlights>
							) : null}
							<section>
								<h2 className="text-3xl mb-6">Kategorien</h2>
								{categorySection.map(category => {
									if (category !== null) {
										return (
											<div key={category.id}>
												<div className="flex flex-col gap-6 md:flex-row justify-between py-8">
													<div className="flex flex-col gap-2">
														<h3 className="text-2xl">{category.title}</h3>
														<p>{category.description}</p>
													</div>
													<ButtonLink
														href={`/category/${slugify(category.title)}/?categoryid=${category.id}`}
													>
														<p>{category.title}</p>
													</ButtonLink>
												</div>
												<hr className="w-full border-light-gray" />
											</div>
										);
									}
								})}
							</section>
							<section>
								<div className="flex flex-col gap-4 mb-4 px-5 py-8 bg-light-gray " style={divStyle}>
									<h3 className="text-xl">Interesse an der HfG zu studieren?</h3>
									<div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-16">
										<p>
											Du möchtest Design studieren? Dann findest du hier alle Infos rund um die
											Bewerbung.
										</p>
										<ButtonLink
											href="https://www.hfg-gmuend.de/bewerben"
											dark={true}
											external={true}
										>
											<p>Bewerben</p>
										</ButtonLink>
									</div>
								</div>
							</section>
							<Content content={data.result.content}></Content>
						</article>
					</div>
				</div>
				{/* <Footer></Footer> */}
			</Container>
		</>
	);
};

export default Page;
