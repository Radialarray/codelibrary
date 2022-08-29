import {ReactNode} from 'react';

type Props = {
	children?: ReactNode;
	// any props that come into the component
};
function Layout({children}: Props) {
	return <div>{children}</div>;
}

export default Layout;
