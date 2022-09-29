import {ReactNode} from 'react';

interface Props {
	children?: ReactNode;
	className?: string;
	// any props that come into the component
}

function Container({children, className}: Props) {
	return (
		<main className={`container mx-auto mb-12 ${className ? className : ''}`}>{children}</main>
	);
}

export default Container;
