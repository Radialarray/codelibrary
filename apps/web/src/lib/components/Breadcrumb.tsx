import {Home as HomeIcon, ChevronRight as ChevronRightIcon} from 'react-feather';
import Link from 'next/link';

interface Props {
	uri: string;
}

const Breadcrumb = ({uri}: Props): JSX.Element => {
	const subPaths = uri.split('/');

	let lastItem = '';
	const crumbs = subPaths.map(subPath => {
		const path = lastItem + subPath + '/';

		lastItem = path;
		const linkText = subPath.charAt(0).toUpperCase() + subPath.slice(1);

		return subPath.length ? (
			<li className="min-w-max flex justify-between items-center" key={path.toString()}>
				<ChevronRightIcon className="w-4 mx-1"></ChevronRightIcon>
				<Link href={`/${path}`} className="block  transition hover:text-gray-700">
					{linkText}
				</Link>
			</li>
		) : (
			''
		);
	});

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
