'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useSnapshot} from 'valtio';
import {searchStore, toggleSearchOverlay} from 'lib/stores/searchStore';
import {Search as SearchIcon} from 'react-feather';
import SearchOverlay from 'lib/components/SearchOverlay';
import NextImage from 'next/image';

interface Props {
	meta: MetaInfo;
}

const Header = ({meta}: Props): JSX.Element => {
	const [navbar, setNavbar] = useState(false);
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
		setNavbar(false);
		if (e.target && e.target instanceof HTMLElement) {
			if ('overlayWrapper' in e.target.dataset) {
				toggleSearchOverlay('closed');
			}
		}
	};

	const openOverlay = () => {
		toggleSearchOverlay('open');
	};

	const checkNavId = (x: string) => {
		return x.toLowerCase().includes('home') ? '' : x;
	};

	/**
	 * All navigation items will be passed to this component
	 */
	const pathname = usePathname();

	const createNavigationItems = () => {
		return meta.navigation.map(item => {
			// If route is active
			if (pathname === `/${checkNavId(item.id)}`) {
				return {
					id: item.id,
					active: true,
					text: item.text
				};
			} else {
				return {
					id: item.id,
					active: false,
					text: item.text
				};
			}
		});
	};

	const navItems = createNavigationItems();

	return (
		<header aria-label="Site Header" className="relative z-50">
			{navbar ? (
				<div
					className="fixed w-screen h-screen top-0 left-0 data-overlay-wrapper overlayWrapper z-10"
					onClick={e => closeOverlay(e)}
				></div>
			) : null}

			<nav className="relative w-full bg-gray-800 shadow-lg z-40">
				<div className="justify-between pt-8 pb-1 px-4 mx-auto  md:items-baseline md:flex md:px-8">
					<div>
						<div className="flex items-center justify-between md:block">
							<Link href="/" className="font-normal flex items-center gap-2 relative z-50">
								<span className="sr-only">Home</span>
								<div className="absolute top-0">
									<NextImage
										src="/hfg-icon.png"
										alt="HfG Logo"
										width="24"
										height="24"
										className="w-12 h-w-12"
									></NextImage>
								</div>
								<p className="ml-12 pl-2 z-50">
									<b className="font-bold">Code</b>Lab
								</p>
							</Link>
							<div className="md:hidden">
								<button
									className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
									onClick={() => setNavbar(!navbar)}
								>
									{navbar ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6 text-black"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6 text-black"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M4 6h16M4 12h16M4 18h16"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>
					</div>
					<div>
						<div
							className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
								navbar ? 'block' : 'hidden'
							}`}
						>
							<ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0  pt-6 md:pt-0">
								{navItems.map(item => {
									return (
										<li key={item.id} className={item.active ? 'text-black' : 'text-gray'}>
											<Link href={`/${checkNavId(item.id)}`}>{item.text}</Link>
										</li>
									);
								})}
								<li>
									<button
										type="button"
										onClick={openOverlay}
										className="block p-6 pt-0 pl-0 w-64 md:w-auto md:pt-0 md:px-2 md:pb-[2.5px]"
									>
										<span className="sr-only"> Search </span>
										<SearchIcon className="object-contain w-[18px] h-[18px]"></SearchIcon>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
			<SearchOverlay
				closeOverlay={closeOverlay}
				searchItems={meta.searchInfo}
				currentPage={meta.title}
			></SearchOverlay>
		</header>
	);
};

export default Header;
