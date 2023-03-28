import {useState, useEffect} from 'react';
import {getPageContent, requestData} from 'lib/api/api';
import Link from 'next/link';

interface Props {
	pageChildren: SearchItem[];
}

// Search for children pages and add them as links to bottom of page
const Chapters = ({pageChildren}: Props): JSX.Element | null => {
	const getChapters = async () => {
		try {
			const data = await Promise.all(
				pageChildren.map(async (item: SearchItem) => {
					const pageToQuery = `page("${item.uri}")`;
					console.log(pageToQuery);

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
					return response;
				})
			);
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	};
	const data = getChapters();
	// console.log(data);

	// if (data === undefined) {
	// 	return <div>Loading...</div>;
	// }
	// return (
	// 	<div>
	// 		{chapters.map((e, i) => {
	// 			return <div key={i}>{e}</div>;
	// 		})}
	// 	</div>
	// );

	// if (response.status === 'ok') {
	// 	const getCategories = () => {
	// 		if (response.result.categories && response.result.categories.length > 0) {
	// 			const categoriesSplit = response.result.categories.split(',');

	// 			return categoriesSplit.map(item => {
	// 				const itemTrimmed = item.trim();
	// 				return (
	// 					<span
	// 						key={itemTrimmed}
	// 						className="inline-flex items-center justify-center rounded-sm bg-black px-3 py-1 text-white"
	// 					>
	// 						<p className="whitespace-nowrap text-sm">{itemTrimmed}</p>
	// 					</span>
	// 				);
	// 			});
	// 		} else {
	// 			return null;
	// 		}
	// 	};

	// 	const categories = getCategories();

	// 	return (
	// 		<li className="flex-1" key={response.result.id}>
	// 			<Link href={response.result.uri} className="group relative block h-48 sm:h-64 lg:h-64">
	// 				<span className="absolute rounded-sm inset-0 border-2 border-dashed border-black"></span>

	// 				<div className="relative rounded-sm flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
	// 					<div className="relative h-full w-full  transition-opacity group-hover:absolute group-hover:opacity-0 ">
	// 						{response.result.banner ? (
	// 							<div className="absolute w-full h-full z-0">
	// 								<NextImage
	// 									className="object-cover object-center h-full w-full grayscale opacity-20"
	// 									key={response.result.banner.id}
	// 									src={response.result.banner.url}
	// 									alt={'Vorschaubild für die Seite ' + response.result.title}
	// 									width={response.result.banner.width}
	// 									height={response.result.banner.height}
	// 								/>
	// 								<div className="absolute top-0 left-0 w-full h-full bg-highlight mix-blend-multiply"></div>
	// 							</div>
	// 						) : null}

	// 						<div className="absolute bottom-0 w-full p-6 flex justify-between gap-2 z-50 text-black">
	// 							<h2 className="pr-4 text-xl font-medium sm:text-2xl">{response.result.title}</h2>
	// 							<div className="flex flex-wrap gap-2">{categories}</div>
	// 						</div>
	// 					</div>

	// 					<div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
	// 						<h3 className="mt-4 text-xl font-medium sm:text-2xl">{response.result.title}</h3>

	// 						<p className="mt-4 text-sm sm:text-base line-clamp-3">{response.result.summary}</p>

	// 						<p className="mt-8 font-bold">Read more</p>
	// 					</div>
	// 				</div>
	// 			</Link>
	// 		</li>
	// 	);
	// } else {
	// 	return null;
	// }

	return null;
};

export default Chapters;
