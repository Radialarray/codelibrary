import {requestData} from 'lib/api/api';
import {findElementByValue} from 'lib/helper/helper';
import NextImage from 'next/image';
import Link from 'next/link';
import {Metadata} from 'next/types';

const getData = async (slug: string, reqBody: object): Promise<KQLResponse> => {
	const requestOptions: KQLRequestOptions = {
		method: 'POST',
		body: reqBody,
		redirect: 'follow'
	};

	const response = await requestData(requestOptions);

	return {...response};
};

export const generateMetadata = async ({params}: {params: {slug: string[]}}): Promise<Metadata> => {
	const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

	return {title: slug.charAt(0).toUpperCase() + slug.slice(1)};
};

const Page = async ({
	params,
	searchParams
}: {
	params: {slug: string[]};
	searchParams: {categoryid: string};
}): Promise<JSX.Element> => {
	const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

	const requestBodyPages = {
		query: 'site.index',
		select: {
			categories: true,
			title: true,
			uri: true,
			summary: true,
			banner: 'page.content.banner.addImagePath'
		},
		pagination: {limit: 100}
	};

	const requestBodyCategories = {
		query: 'site.categories.toStructure'
	};

	const data = await getData(slug, requestBodyPages);
	const categories = await getData(slug, requestBodyCategories);

	if (
		'data' in data.result &&
		Array.isArray(data.result.data) &&
		Array.isArray(categories.result)
	) {
		const findings = findElementByValue(categories.result, searchParams.categoryid);

		const categoryDescription: {description: string; id: string; title: string} = findings as {
			description: string;
			id: string;
			title: string;
		};

		const articles = data.result?.data.filter(article => {
			if (article.categories === searchParams.categoryid) {
				return article;
			}
		});

		return (
			<>
				<h1>Category: {categoryDescription.title}</h1>
				<p>{categoryDescription.description}</p>
				<ol className="my-6 w-full flex flex-col flex-wrap sm:flex-row gap-4 sm:gap-2">
					{articles.map(article => {
						return (
							<>
								<li className="block shrink-0 grow sm:w-80" key={article.title}>
									<Link href={article.uri} className="group relative block h-48 sm:h-64 lg:h-64">
										<span className="absolute rounded-sm inset-0 border-2 border-dashed border-black"></span>

										<div className="relative rounded-sm flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
											<div className="relative h-full w-full  transition-opacity group-hover:absolute group-hover:opacity-0 ">
												{article.banner ? (
													<div className="absolute w-full h-full z-0">
														<NextImage
															className="object-cover object-center h-full w-full grayscale opacity-20"
															key={article.banner.id}
															src={article.banner.url}
															alt={'Vorschaubild für die Seite ' + article.title}
															width={article.banner.width}
															height={article.banner.height}
														/>
														<div className="absolute top-0 left-0 w-full h-full bg-highlight mix-blend-multiply"></div>
													</div>
												) : null}

												<div className="absolute bottom-0 w-full p-6 flex justify-between gap-2 z-50 text-black">
													<h2 className="pr-4 text-xl font-medium sm:text-2xl">{article.title}</h2>
												</div>
											</div>

											<div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
												<h3 className="mt-4 text-xl font-medium sm:text-2xl">{article.title}</h3>

												<p className="mt-4 text-sm sm:text-base line-clamp-3">{article.summary}</p>

												<p className="mt-8 font-bold">Read more</p>
											</div>
										</div>
									</Link>
								</li>
							</>
						);
					})}
				</ol>
			</>
		);
	}

	return <h1>Category</h1>;
};

export default Page;
