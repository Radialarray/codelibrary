'use client';
import * as R from 'ramda';
import slugify from '@sindresorhus/slugify';
import Link from 'next/link';
import {useSnapshot} from 'valtio';
import {searchStore, toggleSearchOverlay} from 'lib/stores/searchStore';

interface Props {
	content: Block[] | Layout[];
}

const Sidebar = ({content}: Props): JSX.Element => {
	const snap = useSnapshot(searchStore);
	console.log(snap);

	const isHeading = (element: Block) => R.equals('heading', element.type);

	const filterHeadings = (content: Block[] | Layout[]) => {
		return content.map(x => {
			if (R.has('columns')(x)) {
				const columns = x.columns.map(column => {
					const blocks = R.filter(isHeading, column.blocks);
					return blocks;
				});

				return columns;
			} else {
				// TODO: what to do if not a layout but only a block
				return content as Block[];
			}
		});
	};

	const createListElements = (elements: Block[]) => {
		if (elements) {
			return elements.map(element => {
				if ('text' in element.content) {
					const getLevel = (content: TextContent) => {
						if ('level' in content) {
							switch (content.level) {
								case 'h1':
									return 'font-base';
								case 'h2':
									return 'text-sm';
								case 'h3':
									return 'text-xs';
								default:
									return 'font-md';
							}
						}
					};

					return (
						<li key={element.id}>
							<Link
								href={`#${slugify(element.content.text)}`}
								className={getLevel(element.content)}
							>
								{element.content.text}
							</Link>
						</li>
					);
				}
			});
		}
	};

	const createHeadings = R.pipe(filterHeadings, R.flatten, createListElements);
	const headings = createHeadings(content);
	// console.log(headings);

	return (
		<div className="flex h-screen flex-col justify-between">
			<div className="px-4 py-6">
				{/* TODO: Placeholder for search shortcut */}
				<span
					onClick={() => toggleSearchOverlay('open')}
					className="block h-10 w-32 rounded-lg bg-gray-200"
				></span>

				<nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
					<ol>{headings}</ol>
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
