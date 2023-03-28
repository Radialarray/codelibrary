import {Home as HomeIcon, ChevronRight as ChevronRightIcon} from 'react-feather';
import Link from 'next/link';

interface Props {
	uri: string;
}

const Breadcrumb = ({uri}: Props): JSX.Element => {
	const crumbs = (): JSX.Element[] | null => {
		if (uri && uri.length > 0) {
			const subPaths = uri ? uri.split('/') : [];

			let lastItem = '';

			const paths = subPaths.map(subPath => {
				const path = lastItem + subPath + '/';

				lastItem = path;
				const linkText = subPath.charAt(0).toUpperCase() + subPath.slice(1);

				return (
					<li className="min-w-max flex justify-between items-center" key={path.toString()}>
						<ChevronRightIcon className="w-4 mx-1"></ChevronRightIcon>
						<Link href={`/${path}`} className="block transition hover:text-gray-700">
							{linkText}
						</Link>
					</li>
				);
			});
			return paths;
		} else {
			return null;
		}
	};

	return (
		<nav aria-label="Breadcrumb">
			<ol role="list" className="flex flex-row items-center gap-1 text-sm text-gray-600">
				<li className="w-4" key={'pathhome'}>
					<Link href="/" className="block transition hover:text-gray-700 min-w-fit">
						<span className="sr-only"> Home </span>
						<HomeIcon></HomeIcon>
					</Link>
				</li>
				{crumbs}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
