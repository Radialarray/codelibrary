import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {dark, github} from 'react-syntax-highlighter/dist/cjs/styles/hljs';

/**
 * Consumes a markdown string and return JSX.Elements, appropriate to the content.
 * @param {Block} props
 * @returns
 */
const Markdown = (props: Block) => {
	// return <ReactMarkdown key={props.id}>{(props.content as TextContent).text}</ReactMarkdown>;
	return (
		<ReactMarkdown
			components={{
				code({node, inline, className, children, ...props}) {
					const match = /language-(\w+)/.exec(className || '');
					return !inline && match ? (
						// @ts-expect-error
						<SyntaxHighlighter language={match[1]} PreTag="div" style={dark} {...props}>
							{String(children).replace(/\n$/, '')}
						</SyntaxHighlighter>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				}
			}}
		>
			{(props.content as TextContent).text}
		</ReactMarkdown>
	);
};

export default Markdown;
