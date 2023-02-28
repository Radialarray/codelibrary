import htmlReactParser from 'html-react-parser';
import {HTMLReactParserOptions, Element, domToReact} from 'html-react-parser';
import {sanitize} from '../../helper/helper';
import Link from 'next/link';

const options: HTMLReactParserOptions = {
	replace: domNode => {
		if (!(domNode instanceof Element) || !domNode.attribs) {
			return null;
		}

		if (domNode.name === 'a') {
			return <Link href={domNode.attribs.href}>{domToReact(domNode.children, options)}</Link>;
		}
	}
};

/**
 * Creates a JSX.Element from a text block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Text = (x: Block): JSX.Element => {
	// const element = htmlReactParser((x.content as TextContent).text);
	// const keyedElement = {...(element as object), key: x.id};
	// return keyedElement;

	const sanitized = sanitize((x.content as TextContent).text);
	return <div key={x.id}>{htmlReactParser(sanitized.__html, options)}</div>;
};

export default Text;
