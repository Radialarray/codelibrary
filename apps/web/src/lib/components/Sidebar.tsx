'use client';
import * as R from 'ramda';
import slugify from '@sindresorhus/slugify';
import Link from 'next/link';
import {scrollStore, updateElement} from 'lib/stores/scrollStore';
import {useSnapshot} from 'valtio';
import {useEffect, useState} from 'react';

interface Props {
	content: Page['content'];
	uri: string;
	className?: string;
}

const Sidebar = ({content, uri, className}: Props): JSX.Element | null => {
	const snap = useSnapshot(scrollStore);
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		// just trigger this so that the initial state
		// is updated as soon as the component is mounted
		// related: https://stackoverflow.com/a/63408216
		handleScroll();

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	if (typeof content === 'string' || content === null) {
		return null;
	}

	const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		// first prevent the default behavior
		e.preventDefault();
		// get the href and remove everything before the hash (#)
		const href = e.currentTarget.href;

		const targetId = href.replace(/.*#/, '');
		console.log(targetId);
		// get the element by id and use scrollIntoView
		const elem = document.getElementById(targetId);
		elem?.scrollIntoView({
			behavior: 'smooth'
		});
	};

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
							return 'text-sm';
						}
					};

					return (
						<li
							key={element.id}
							className={
								scrollY > 300
									? `opacity-100 transition-all relative flex gap-4 items-center`
									: `opacity-0 transition-all relative flex gap-4 items-center`
							}
						>
							<span
								className={
									snap.currentElement === slugify(element.content.text)
										? `absolute -ml-5 h-3 w-3 rounded-full border-solid border-black border-2 transition-all`
										: `absolute -ml-4 h-1 w-1 rounded-full border-solid border-black border-2 transition-all`
								}
							></span>
							<Link
								href={`/${uri}/#${slugify(element.content.text)}`}
								className={
									snap.currentElement === slugify(element.content.text)
										? `transition-all`
										: `-translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500`
								}
								onClick={handleScroll}
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
		<aside className="fixed top-0 left-0 h-full ml-6">
			{/* TODO: Placeholder for search shortcut */}
			{/* <Search></Search> */}

			<nav aria-label="Main Nav" className="relative top-1/2 ml-3">
				<ol className="group list-none flex flex-col gap-1 text-xs">{headings}</ol>
			</nav>
		</aside>
	);
};

export default Sidebar;
