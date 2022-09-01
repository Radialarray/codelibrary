import {ReactNode} from 'react';
import classNames from 'classnames';
type Props = {
	children?: ReactNode;
	className?: string;
	// any props that come into the component
};
function Container({children, className}: Props) {
	return <main className={`container mx-auto ${className ? className : ''}`}>{children}</main>;
}

export default Container;
