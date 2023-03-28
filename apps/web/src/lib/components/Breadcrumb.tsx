import {Home as HomeIcon, ChevronRight as ChevronRightIcon} from 'react-feather';
import Link from 'next/link';
import {ReactNode} from 'react';

interface Props {
	uri: string;
}

const Breadcrumb = ({uri}: Props): JSX.Element => {
	// 	const createCrumbs = (uri:String) => {
	// 		if (uri && uri.length > 0) {
	// 			const subPaths = uri.split('/');
	// 			let lastItem = '';

	// 			const paths = subPaths.map(subPath => {
	// 				const path = lastItem + subPath + '/';
	// 				lastItem = path;
	// 				const linkText = subPath.charAt(0).toUpperCase() + subPath.slice(1);
	// // 				const pathItem = {
	// // link: path,
	// // 					linkText: linkText
	// // 				}
	// 				// return  pathItem;
	// 			}

	// 				return paths;
	// 		} else {
	// 			return null;
	// 		}
	// 	};

	const createCrumbs = () => {
		if (uri && uri.length > 0) {
			const subPaths = uri.split('/');
			let lastItem = '';

			const paths = subPaths.map(subPath => {
				const path = lastItem + subPath + '/';
				lastItem = path;

				const linkText = subPath.charAt(0).toUpperCase() + subPath.slice(1);
				const pathItem = {
					link: path,
					linkText: linkText
				};
				return pathItem;
			});
			return paths;
		} else {
			return null;
		}
	};

	const crumbs = createCrumbs();

	return (
		<nav aria-label="Breadcrumb">
			<ul role="list" className="flex flex-row items-center gap-1 text-sm text-gray-600">
				<li className="w-4" key={'home'}>
					<Link href="/" className="block transition hover:text-gray-700 min-w-fit">
						<span className="sr-only"> Home </span>
						<HomeIcon className="w-4"></HomeIcon>
					</Link>
				</li>
				{crumbs
					? crumbs.map(crumb => {
							return (
								<li
									className="min-w-max flex justify-between items-center"
									key={crumb.link.toString()}
								>
									<ChevronRightIcon className="w-4 mx-1"></ChevronRightIcon>
									<Link href={`/${crumb.link}`} className="block transition hover:text-gray-700">
										{crumb.linkText}
									</Link>
								</li>
							);
					  })
					: null}
			</ul>
		</nav>
	);
};

export default Breadcrumb;
