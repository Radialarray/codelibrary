'use client';
import {Sandpack} from '@codesandbox/sandpack-react';
import {githubLight} from '@codesandbox/sandpack-themes';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {github} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import * as R from 'ramda';

/**
 * Creates a JSX.Element from a code block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Code = (props: Block): JSX.Element => {
	// TODO: Syntax Highlighting for everything
	const basicHighlighting = (x: Block) => {
		const codeString = (x.content as CodeContent).code;
		return (
			<div className="mt-6">
				<SyntaxHighlighter
					key={props.id}
					language={(x.content as CodeContent).language}
					style={github}
				>
					{codeString}
				</SyntaxHighlighter>
			</div>
		);
	};

	// TODO: Basic readonly code viewer for HTML,CSS,JS
	const basicInteractiveSandbox = (props: Block) => {
		return (
			<Sandpack
				key={props.id}
				options={{readOnly: true}}
				theme={githubLight}
				template="vanilla"
				files={{
					'/src/index.cpp': (props.content as CodeContent).code,
					'/src/index2.ts': (props.content as CodeContent).code,
					[`/src/index4.${(props.content as CodeContent).language}`]: (props.content as CodeContent)
						.code
				}}
			/>
		);
	};

	// TODO: Interactive viewer: P5JS usw.
	// const fullInteractiveSandbox = (props: Block) => {
	// 	return (
	// 		<Sandpack
	// 			key={props.id}
	// 			options={{readOnly: true}}
	// 			// theme={sandpackDark}
	// 			theme={githubLight}
	// 			template="vanilla"
	// 			files={{
	// 				'/src/index.js': (props.content as CodeContent).code
	// 			}}
	// 		/>
	// 	);
	// };

	const selectCodeEnvironment = R.cond<Block[], JSX.Element>([
		[x => R.equals('js', (x.content as CodeContent).language), basicInteractiveSandbox],
		[x => R.equals('html', (x.content as CodeContent).language), basicInteractiveSandbox],
		[x => R.equals('css', (x.content as CodeContent).language), basicInteractiveSandbox],
		[x => R.equals('json', (x.content as CodeContent).language), basicHighlighting],
		[x => R.equals('markdown', (x.content as CodeContent).language), basicHighlighting],
		[x => R.equals('scss', (x.content as CodeContent).language), basicInteractiveSandbox],
		[x => R.equals('sass', (x.content as CodeContent).language), basicInteractiveSandbox],
		[R.T, basicHighlighting]
	]);

	const codeBlock = selectCodeEnvironment(props);

	return codeBlock;
};

export default Code;
