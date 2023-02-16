import {Home as HomeIcon, ChevronRight as ChevronRightIcon} from 'react-feather';
import Link from 'next/link';

interface Props {
	url: string;
}

const Breadcrumb = ({url}: Props): JSX.Element => {
	const urlDecomposed = new URL(url);

	const subPaths = urlDecomposed.pathname.split('/');

	let lastItem = '';
	const crumbs = subPaths.map((subPath, index) => {
		const path = lastItem + subPath + '/';
		lastItem = path;
		const linkText = subPath.charAt(0).toUpperCase() + subPath.slice(1);

		return subPath.length ? (
			<li key={path.toString()}>
				<ChevronRightIcon></ChevronRightIcon>

				<Link href={`${path}${index}`} className="block transition hover:text-gray-700">
					{linkText}
				</Link>
			</li>
		) : (
			''
		);
	});

	return (
		<nav aria-label="Breadcrumb">
			<ol role="list" className="flex items-center gap-1 text-sm text-gray-600">
				<li key={'pathhome'}>
					<Link href="/" className="block transition hover:text-gray-700">
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
