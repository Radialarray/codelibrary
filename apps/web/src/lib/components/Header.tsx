'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {useEffect} from 'react';
import {useSnapshot} from 'valtio';
import {searchStore, toggleSearchOverlay} from 'lib/stores/searchStore';
import {Search as SearchIcon} from 'react-feather';
import SearchOverlay from 'lib/components/SearchOverlay';

interface Props {
	meta: {
		navigation: Array<NavItem>;
		search: Array<SearchItem>;
	};
	// any props that come into the component
}

const checkNavId = (x: string) => {
	return x.toLowerCase().includes('home') ? '' : x;
};

const Header = ({meta}: Props) => {
	const snap = useSnapshot(searchStore);

	// Toggle the menu when ⌘K is pressed
	useEffect(() => {
		const down = (e: {key: string; ctrlKey: boolean}) => {
			// Toggle overlay on or off
			if ((e.key === 'k' && e.ctrlKey) || e.key === 'Escape') {
				toggleSearchOverlay(snap.status === 'closed' ? 'open' : 'closed');
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, [snap.status]);

	const closeOverlay = (e: React.MouseEvent) => {
		// console.log(e);

		if (e.target && e.target instanceof HTMLElement) {
			// TODO: Find right type interface for this specific event!
			if ('overlayWrapper' in e.target.dataset) {
				toggleSearchOverlay('closed');
			}
		}
	};

	const openOverlay = () => {
		toggleSearchOverlay('open');
	};

	/**
	 * All navigation items will be passed to this component
	 */
	const pathname = usePathname();
	// console.log(meta);

	const navigationItems = meta.navigation.map(item => {
		// If route is active
		if (pathname === `/${checkNavId(item.id)}`) {
			return (
				<li key={item.id} className="border-b-2 border-slate-600">
					<Link href={`/${checkNavId(item.id)}`}>{item.text}</Link>
				</li>
			);
		} else {
			return (
				<li key={item.id}>
					<Link href={`/${checkNavId(item.id)}`}>{item.text}</Link>
				</li>
			);
		}
	});

	return (
		<>
			<header className="text-lg">
				<div className="flex items-center h-16 gap-8  mx-auto px-4">
					<Link href="/" className="font-normal">
						hfg <b className="font-bold">code</b>lab
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
								<SearchIcon></SearchIcon>
							</button>
						</span>
					</div>
				</div>
				<SearchOverlay closeOverlay={closeOverlay} searchItems={meta.search}></SearchOverlay>
			</header>
		</>
	);
};

export default Header;
