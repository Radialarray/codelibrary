import {requestData} from 'lib/api/api';
import {findElementByValue} from 'lib/helper/helper';
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

const Page = async ({params}: {params: {slug: string[]}}): Promise<JSX.Element> => {
	const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

	const requestBodyPages = {
		query: 'site.index',
		select: {
			categories: true,
			title: true,
			uri: true
		},
		pagination: {limit: 100}
	};

	const requestBodyCategories = {
		query: 'site.categories.toStructure'
	};

	const data = await getData(slug, requestBodyPages);
	const categories = await getData(slug, requestBodyCategories);
	console.log(categories);

	if (Array.isArray(categories.result)) {
		const categoryId = findElementByValue(categories.result, slug);
		console.log(categoryId);
	}

	if ('data' in data.result && Array.isArray(data.result.data)) {
		const articles = data.result?.data.map(article => {
			console.log(article);
		});
	}

	return <h1>Category</h1>;
};

export default Page;
