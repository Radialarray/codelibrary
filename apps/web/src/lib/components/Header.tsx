'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {useSnapshot} from 'valtio';
import {searchStore, toggleSearchOverlay} from 'lib/stores/searchStore';
import {Search as SearchIcon} from 'react-feather';
import SearchOverlay from 'lib/components/SearchOverlay';
import NextImage from 'next/image';
import {MenuButton} from 'lib/components/BurgerMenu';

interface Props {
	meta: MetaInfo;
	// any props that come into the component
}

const checkNavId = (x: string) => {
	return x.toLowerCase().includes('home') ? '' : x;
};

const Header = ({meta}: Props) => {
	const snap = useSnapshot(searchStore);
	const [menuState, setMenuState] = useState(false);

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
		if (e.target && e.target instanceof HTMLElement) {
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

	const navigationItems = () => {
		if (meta.navigation) {
			meta.navigation.map(item => {
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
		} else {
			return null;
		}
	};

	return (
		<>
			<header aria-label="Site Header" className="text-lg bg-white">
				<div
					className={`${
						menuState === true ? 'bg-white' : ''
					} fixed h-2/3 md:relative flex flex-col md:flex-row md:items-end w-screen md:w-auto md:h-16 gap-8 mx-auto px-4 z-50  md:bg-none transition-all`}
				>
					<Link href="/" className="font-normal flex items-center gap-2 relative">
						<div className="absolute top-0 left-0 bg-white w-screen h-24 -ml-4"></div>
						<span className="sr-only">Home</span>
						<div className="md:absolute top-1/4 mt-4">
							<NextImage
								src="/hfg-icon.png"
								alt="HfG Logo"
								width="24"
								height="24"
								className="w-16 h-16"
							></NextImage>
						</div>
						<p className="md:ml-16 pl-2 z-50">
							<b className="font-bold">Code</b>Lab
						</p>
					</Link>

					<div
						className={`${
							menuState === true ? 'h-2/3' : 'h-0 overflow-hidden'
						} block md:flex flex-col w-full md:h-auto md:flex-row md:items-end md:justify-end md:flex-1 mb-2 justify-center transition-all`}
					>
						<nav
							className={menuState === true ? 'md:block' : 'hidden md:block'}
							aria-labelledby="header-navigation"
						>
							<h2 className="sr-only" id="header-navigation">
								Header navigation
							</h2>

							<ul className="flex flex-col md:flex-row text-sm md:items-center gap-8 justify-center align-center">
								{navigationItems}
							</ul>
						</nav>
						<span className=" md:block">
							<button type="button" onClick={openOverlay} className="block px-6 pb-[2.5px]">
								<span className="sr-only"> Search </span>
								<SearchIcon className="object-contain w-[18px] h-[18px]"></SearchIcon>
							</button>
						</span>
					</div>
					<button
						type="button"
						aria-label="Burger Menu Toggle"
						onClick={() => setMenuState(!menuState)}
						className="block absolute right-0 p-8 md:static rounded bg-gray-100 md:p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
					>
						<span className="sr-only">Toggle menu</span>
						<MenuButton isOpen={menuState} />
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
