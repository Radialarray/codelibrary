import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {github} from 'react-syntax-highlighter/dist/cjs/styles/hljs';

/**
 * Consumes a markdown string and return JSX.Elements, appropriate to the content.
 * @param {Block} props
 * @returns
 */
const Markdown = (props: Block) => {
	// return <ReactMarkdown key={props.id}>{(props.content as TextContent).text}</ReactMarkdown>;
	return (
		<ReactMarkdown
			key={props.id}
			components={{
				code({inline, className, children, ...props}) {
					const match = /language-(\w+)/.exec(className || '');
					return !inline && match ? (
						// @ts-expect-error: Cannot solve error thrown on the style tag, implementation conflicts
						<SyntaxHighlighter language={match[1]} PreTag="div" style={github} {...props}>
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
