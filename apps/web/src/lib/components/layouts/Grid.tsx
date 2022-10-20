import {ReactNode} from 'react';

interface Props {
	children?: ReactNode;
	className?: string;
	// any props that come into the component
}

function Grid({children, className}: Props) {
	return (
		<section className={`grid grid-cols-1 md:grid-cols-12 gap-4 ${className ? className : ''}`}>
			{children}
		</section>
	);
}

export default Grid;
