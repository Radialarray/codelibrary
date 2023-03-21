'use client';
import slugify from '@sindresorhus/slugify';
import {InView} from 'react-intersection-observer';
import {updateElement} from 'lib/stores/scrollStore';

/**
 * Creates a JSX.Element from a heading block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Heading = (x: Block): JSX.Element | null => {
	const handleInView = (element: string) => {
		updateElement(element);
	};

	switch ((x.content as TextContent).level) {
		case 'h1':
			return (
				<InView
					as="div"
					id={`${slugify((x.content as TextContent).text)}`}
					onChange={(inView, entry) => handleInView(entry.target.id)}
					threshold={0.5}
				>
					<h1 key={x.id} className="mt-12 mb-6">
						{(x.content as TextContent).text}
					</h1>
				</InView>
			);
		case 'h2':
			return (
				<InView
					as="div"
					id={`${slugify((x.content as TextContent).text)}`}
					onChange={(inView, entry) => handleInView(entry.target.id)}
					threshold={0.5}
				>
					<h2 key={x.id} className="mt-12 mb-6">
						{(x.content as TextContent).text}
					</h2>
				</InView>
			);
		case 'h3':
			return (
				<InView
					as="div"
					id={`${slugify((x.content as TextContent).text)}`}
					onChange={(inView, entry) => handleInView(entry.target.id)}
					threshold={0.5}
				>
					<h3 key={x.id} className="mt-12 mb-6">
						{(x.content as TextContent).text}
					</h3>
				</InView>
			);
		case 'h4':
			return (
				<InView
					as="div"
					id={`${slugify((x.content as TextContent).text)}`}
					onChange={(inView, entry) => handleInView(entry.target.id)}
					threshold={0.5}
				>
					<h4 key={x.id} className="mt-12 mb-6">
						{(x.content as TextContent).text}
					</h4>
				</InView>
			);
		case 'h5':
			return (
				<InView
					as="div"
					id={`${slugify((x.content as TextContent).text)}`}
					onChange={(inView, entry) => handleInView(entry.target.id)}
					threshold={0.5}
				>
					<h5 key={x.id} className="mt-12 mb-6">
						{(x.content as TextContent).text}
					</h5>
				</InView>
			);
		case 'h6':
			return (
				<InView
					as="div"
					id={`${slugify((x.content as TextContent).text)}`}
					onChange={(inView, entry) => handleInView(entry.target.id)}
					threshold={0.5}
				>
					<h6 key={x.id} className="mt-12 mb-6">
						{(x.content as TextContent).text}
					</h6>
				</InView>
			);
		default:
			return null;
	}
};

export default Heading;
