'use client';
import * as R from 'ramda';
import slugify from '@sindresorhus/slugify';
import Link from 'next/link';
import Search from 'lib/components/Search';

interface Props {
	content: Page['content'];
	uri: string;
}

const Sidebar = ({content, uri}: Props): JSX.Element | null => {
	if (typeof content === 'string' || content === null) {
		return null;
	}

	const isHeading = (element: Block) => R.equals('heading', element.type);

	const filterHeadings = (content: Block[] | Layout[]) => {
		return content.map(x => {
			// console.log(x);
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
				if (element.type === 'heading' && 'text' in element.content) {
					const getLevel = (content: TextContent) => {
						if ('level' in content) {
							switch (content.level) {
								// case 'h1':
								// 	return 'font-base';
								// case 'h2':
								// 	return 'text-sm';
								// case 'h3':
								// 	return 'text-xs';
								default:
									return 'text-sm';
							}
						}
					};

					return (
						<li key={element.id}>
							<Link
								href={`/${uri}#${slugify(element.content.text)}`}
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
		<aside>
			<div className="flex h-screen flex-col justify-between">
				<div className="px-4">
					{/* TODO: Placeholder for search shortcut */}
					<Search></Search>

					<nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
						<ol>{headings}</ol>
					</nav>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
