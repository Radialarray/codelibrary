'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {useEffect} from 'react';
import {useSnapshot} from 'valtio';
import {searchStore, toggleSearchOverlay} from 'lib/stores/searchStore';
import {Search as SearchIcon} from 'react-feather';
import SearchOverlay from 'lib/components/SearchOverlay';
import NextImage from 'next/image';

interface Props {
	meta: MetaInfo;
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
				<li key={item.id} className="text-black">
					<Link href={`/${checkNavId(item.id)}`}>{item.text}</Link>
				</li>
			);
		} else {
			return (
				<li key={item.id} className="text-gray">
					<Link href={`/${checkNavId(item.id)}`}>{item.text}</Link>
				</li>
			);
		}
	});

	return (
		<>
			<header aria-label="Site Header" className="text-lg bg-white">
				<div className="relative flex items-end h-16 gap-8 mx-auto px-4 z-50">
					<Link href="/" className="font-normal flex gap-2">
						<span className="sr-only">Home</span>
						<div className="absolute top-1/4 mt-4">
							<NextImage
								src="/hfg-icon.png"
								alt="HfG Logo"
								width="24"
								height="24"
								className="w-16 h-16"
							></NextImage>
						</div>
						<p className="ml-16 pl-2 z-50">
							<b className="font-bold">Code</b>Lab
						</p>
					</Link>

					<div className="flex items-end justify-end flex-1 mb-2">
						<nav className="hidden md:block" aria-labelledby="header-navigation">
							<h2 className="sr-only" id="header-navigation">
								Header navigation
							</h2>

							<ul className="flex text-sm items-center gap-8">{navigationItems}</ul>
						</nav>
						<span className="hidden md:block">
							<button type="button" onClick={openOverlay} className="block px-6 pb-[2.5px]">
								<span className="sr-only"> Search </span>
								<SearchIcon className="object-contain w-[18px] h-[18px]"></SearchIcon>
							</button>
						</span>
					</div>
					<button
						type="button"
						className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
					>
						<span className="sr-only">Toggle menu</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>
				<SearchOverlay
					closeOverlay={closeOverlay}
					searchItems={meta.searchInfo}
					currentPage={meta.title}
				></SearchOverlay>
			</header>
		</>
	);
};

export default Header;
