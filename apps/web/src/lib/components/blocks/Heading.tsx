import React from 'react';
import slugify from '@sindresorhus/slugify';

/**
 * Creates a JSX.Element from a heading block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Heading = (x: Block): JSX.Element => {
	return React.createElement(
		(x.content as TextContent).level || 'h1',
		{
			key: x.id,
			id: `${slugify((x.content as TextContent).text)}`,
			className: 'my-6'
		},
		(x.content as TextContent).text
	);
};

export default Heading;
