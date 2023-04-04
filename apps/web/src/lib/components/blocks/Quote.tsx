import {sanitize} from '../../helper/helper';

/**
 * Creates a JSX.Element from a quote block.
 * @param {Block} props
 * @returns {JSX.Element}
 */
const Quote = (props: Block): JSX.Element => {
	return (
		<figure key={props.id}>
			<blockquote
				cite={(props.content as QuoteContent).citation}
				dangerouslySetInnerHTML={sanitize((props.content as QuoteContent).text)}
			></blockquote>
			<figcaption>{(props.content as QuoteContent).citation}</figcaption>
		</figure>
	);
};

export default Quote;
