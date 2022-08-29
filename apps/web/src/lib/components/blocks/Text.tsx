import htmlReactParser from 'html-react-parser';
import {sanitize} from '../../helper/helper';

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
	return <div key={x.id}>{htmlReactParser(sanitized.__html)}</div>;
};

export default Text;
