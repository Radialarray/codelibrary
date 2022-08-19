import {createElement, Fragment, useEffect, useState} from 'react';
import {unified} from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import remarkCodeHike from '@code-hike/mdx';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import theme from 'shiki/themes/nord.json';

const text = `<h2>Hello, world!</h2>
<p>Welcome to my page 👀</p>
\`\`\` javascript
Keyboard.write(65); 
\`\`\``;

function useProcessor(text: any) {
	const [Content, setContent] = useState(Fragment);

	useEffect(() => {
		unified()
			.use(rehypeParse, {fragment: true})
			.use(rehypeReact, {createElement, Fragment})
			.process(text)
			.then(file => {
				setContent(file.result);
			});
	}, [text]);

	return Content;
}

export default function Code() {
	return useProcessor(text);
}
