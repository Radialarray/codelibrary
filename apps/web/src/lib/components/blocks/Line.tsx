/**
 * Creates a JSX.Element from a line block.
 * @param {Block} x
 * @returns {JSX.Element}
 */
const Line = (props: Block): JSX.Element => {
	return <hr key={props.id} />;
};

export default Line;
