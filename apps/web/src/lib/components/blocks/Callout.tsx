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
			return (
				<Link className="underline" href={domNode.attribs.href}>
					{domToReact(domNode.children, options)}
				</Link>
			);
		}
	}
};

/**
 * Creates a JSX.Element from a text block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Callout = (x: Block): JSX.Element => {
	// const element = htmlReactParser((x.content as TextContent).text);
	// const keyedElement = {...(element as object), key: x.id};
	// return keyedElement;

	const divStyle = {
		backgroundImage:
			'repeating-linear-gradient(0deg, #EBEB26, #EBEB26 11px, transparent 11px, transparent 21px, #EBEB26 21px), repeating-linear-gradient(90deg, #EBEB26, #EBEB26 11px, transparent 11px, transparent 21px, #EBEB26 21px), repeating-linear-gradient(180deg, #EBEB26, #EBEB26 11px, transparent 11px, transparent 21px, #EBEB26 21px), repeating-linear-gradient(270deg, #EBEB26, #EBEB26 11px, transparent 11px, transparent 21px, #EBEB26 21px)',
		backgroundSize: '3px 100%, 100% 3px, 3px 100% , 100% 3px',
		backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
		backgroundRepeat: 'no-repeat'
	};

	const sanitized = sanitize((x.content as TextContent).text);
	return (
		<div className="mb-4 bg-light-highlight px-4 py-6" style={divStyle} key={x.id}>
			<b>Tipp: </b>
			{htmlReactParser(sanitized.__html, options)}
		</div>
	);
};

export default Callout;
