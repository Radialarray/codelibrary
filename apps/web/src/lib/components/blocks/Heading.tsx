import React from 'react';

/**
 * Creates a JSX.Element from a heading block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Heading = (x: Block): JSX.Element => {
	return React.createElement(
		(x.content as TextContent).level || 'h1',
		{key: x.id},
		(x.content as TextContent).text
	);
};

export default Heading;
