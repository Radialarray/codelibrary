import {sanitize} from '../../helper/helper';

/**
 * Creates a JSX.Element from a quote block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Quote = (x: Block): JSX.Element => {
	return (
		<figure key={x.id}>
			<blockquote
				cite={(x.content as QuoteContent).citation}
				dangerouslySetInnerHTML={sanitize((x.content as QuoteContent).text)}
			></blockquote>
			<figcaption>{(x.content as QuoteContent).citation}</figcaption>
		</figure>
	);
};

export default Quote;
