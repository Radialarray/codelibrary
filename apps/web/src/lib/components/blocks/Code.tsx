'use client';
import {Sandpack} from '@codesandbox/sandpack-react';
import {githubLight} from '@codesandbox/sandpack-themes';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {github} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import * as R from 'ramda';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Clipboard as ClipboardIcon, Check as CheckIcon} from 'react-feather';
import {useState} from 'react';

/**
 * Creates a JSX.Element from a code block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Code = (props: Block): JSX.Element => {
	const [copied, setCopied] = useState(false);

	const copy = () => {
		console.log('Copied!');
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 5000);
	};

	// TODO: Syntax Highlighting for everything
	const basicHighlighting = (x: Block) => {
		const codeString = (x.content as CodeContent).code;
		return (
			<div className="relative mt-6 pt-6 bg-[#f8f8f8]">
				<div className="absolute top-0 w-full p-1 flex flex-row justify-between items-center">
					<span className="m-1 pb-1 text-sm text-gray">
						{(x.content as CodeContent).language.toUpperCase()}
					</span>
					<button type="button">
						<CopyToClipboard text={codeString} onCopy={() => copy()}>
							<span className="flex text-gray justify-between gap-2">
								Copy
								{copied ? (
									<CheckIcon className="stroke-gray"></CheckIcon>
								) : (
									<ClipboardIcon className="stroke-gray"></ClipboardIcon>
								)}
							</span>
						</CopyToClipboard>
					</button>
				</div>

				<SyntaxHighlighter
					key={props.id}
					language={(x.content as CodeContent).language}
					style={github}
					wrapLines={true}
					wrapLongLines={true}
					showLineNumbers={false}
					showInlineLineNumbers={false}
				>
					{codeString}
				</SyntaxHighlighter>
			</div>
		);
	};

	// TODO: Basic readonly code viewer for HTML,CSS,JS
	const basicInteractiveSandbox = (props: Block) => {
		return (
			<div className="relative mt-6">
				<button className="absolute flex flex-row  top-0 right-0 p-2 z-50">
					<CopyToClipboard text={(props.content as CodeContent).code} onCopy={() => copy()}>
						<span>{copied ? <CheckIcon></CheckIcon> : <ClipboardIcon></ClipboardIcon>}</span>
					</CopyToClipboard>
				</button>

				<Sandpack
					key={props.id}
					options={{readOnly: true}}
					theme={githubLight}
					template="vanilla"
					files={{
						'/src/index.cpp': (props.content as CodeContent).code,
						'/src/index2.ts': (props.content as CodeContent).code,
						[`/src/index4.${(props.content as CodeContent).language}`]: (
							props.content as CodeContent
						).code
					}}
				/>
			</div>
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
		// [x => R.equals('js', (x.content as CodeContent).language), basicInteractiveSandbox],
		// [x => R.equals('html', (x.content as CodeContent).language), basicInteractiveSandbox],
		// [x => R.equals('css', (x.content as CodeContent).language), basicInteractiveSandbox],
		// [x => R.equals('json', (x.content as CodeContent).language), basicHighlighting],
		// [x => R.equals('markdown', (x.content as CodeContent).language), basicHighlighting],
		// [x => R.equals('scss', (x.content as CodeContent).language), basicInteractiveSandbox],
		// [x => R.equals('sass', (x.content as CodeContent).language), basicInteractiveSandbox],
		[R.T, basicHighlighting]
	]);

	const codeBlock = selectCodeEnvironment(props);

	return codeBlock;
};

export default Code;
