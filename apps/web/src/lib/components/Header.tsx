import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

import {MagnifyingGlassIcon} from '@radix-ui/react-icons';

import SearchOverlay from 'lib/components/SearchOverlay';
import * as R from 'ramda';

interface Props {
	navItems: Array<NavItem>;
	searchItems: Array<SearchItem>;
	// any props that come into the component
}

const checkNavId = (x: string) => {
	return x.toLowerCase().includes('home') ? '' : x;
};

const Header = ({navItems, searchItems}: Props) => {
	// SearchOverlay state
	const [open, setOpen] = useState(false);

	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (e: {key: string; ctrlKey: any}) => {
			// Toggle overlay on or off
			if ((e.key === 'k' && e.ctrlKey) || e.key === 'Escape') {
				setOpen(open => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	const closeOverlay = (e: {target: any}) => {
		const hasWrapperAttribute = R.has('overlayWrapper');
		if (hasWrapperAttribute(e.target.dataset)) {
			setOpen(false);
		}
	};

	const openOverlay = e => {
		setOpen(true);
	};

	/**
	 * All navigation items will be passed to this component
	 */
	const router = useRouter();
	const navigationItems = navItems.map(item => {
		// If route is active
		if (router.pathname === `/${checkNavId(item.id)}`) {
			return (
				<li key={item.id} className="border-b-2 border-slate-600">
					<Link href={`/${checkNavId(item.id)}`}>
						<a>{item.text}</a>
					</Link>
				</li>
			);
		} else {
			return (
				<li key={item.id}>
					<Link href={`/${checkNavId(item.id)}`}>
						<a>{item.text}</a>
					</Link>
				</li>
			);
		}
	});

	return (
		<>
			<header className="bg-white text-lg">
				<div className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-8">
					<Link href="/">
						<a className="font-normal">
							hfg <b className="font-bold">code</b>lab
						</a>
					</Link>

					<div className="flex items-center justify-end flex-1">
						<nav className="hidden md:block" aria-labelledby="header-navigation">
							<h2 className="sr-only" id="header-navigation">
								Header navigation
							</h2>

							<ul className="flex  items-center gap-6">{navigationItems}</ul>
						</nav>
						<span className="hidden sm:block">
							<button
								type="button"
								onClick={openOverlay}
								className="block p-6 border-b-4 border-transparent"
							>
								<span className="sr-only"> Search </span>
								<MagnifyingGlassIcon></MagnifyingGlassIcon>
							</button>
						</span>
					</div>
				</div>
				<SearchOverlay
					openOverlay={openOverlay}
					closeOverlay={closeOverlay}
					open={open}
					searchItems={searchItems}
				></SearchOverlay>
			</header>
		</>
	);
};

export default Header;
