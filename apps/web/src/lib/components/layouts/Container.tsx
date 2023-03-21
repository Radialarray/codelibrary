import {ReactNode} from 'react';

interface Props {
	children?: ReactNode;
	className?: string;
	// any props that come into the component
}

function Container({children, className}: Props) {
	return <main className={`mx-auto pb-12 relative ${className ? className : ''}`}>{children}</main>;
}

export default Container;
