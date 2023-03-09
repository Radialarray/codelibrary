import {sanitize} from '../../helper/helper';
import htmlReactParser from 'html-react-parser';

/**
 * Creates a JSX.Element from a list block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const List = (x: Block): JSX.Element => {
	const sanitized = sanitize((x.content as TextContent).text);

	return (
		<ul className="mb-6 list-disc list-outside pl-6" key={x.id}>
			{htmlReactParser(sanitized.__html)}
		</ul>
	);
};

export default List;
