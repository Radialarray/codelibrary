import {HomeIcon, CaretRightIcon} from '@radix-ui/react-icons';
import Link from 'next/link';

interface Props {
	url: string;
}

const Breadcrumb = ({url}: Props): JSX.Element => {
	const urlDecomposed = new URL(url);

	const subPaths = urlDecomposed.pathname.split('/');

	let lastItem = '';
	const crumbs = subPaths.map(subPath => {
		const path = lastItem + subPath + '/';
		lastItem = path;
		const linkText = subPath.charAt(0).toUpperCase() + subPath.slice(1);

		return subPath.length ? (
			<>
				<li key={`caret${path}`}>
					<CaretRightIcon></CaretRightIcon>
				</li>
				<li key={path.toString()}>
					<Link href={path} className="block transition hover:text-gray-700">
						{linkText}
					</Link>
				</li>
			</>
		) : (
			''
		);
	});

	return (
		<nav aria-label="Breadcrumb">
			<ol key={'breadcrumb'} role="list" className="flex items-center gap-1 text-sm text-gray-600">
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
