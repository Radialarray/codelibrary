import {MouseEventHandler} from 'react';
import {Command} from 'cmdk';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {useSnapshot} from 'valtio';
import {closeSearchOverlay, searchStore} from 'lib/stores/searchStore';
import NextImage from 'next/image';
interface Props {
	closeOverlay: MouseEventHandler;
	// searchItems: SearchItem[];
	currentPage: string;
	// searchItems: {
	// 	searchChildren: [];
	// 	searchGlobal: [];
	// 	searchAll: [];
	// };
	searchItems: MetaInfo['searchInfo'];
}

const SearchOverlay = ({closeOverlay, currentPage, searchItems}: Props): JSX.Element => {
	const snap = useSnapshot(searchStore);

	const handleLinkClick = () => {
		closeSearchOverlay();
	};

	const groupStyle = `select-none text-sm text-gray mt-4`;

	const createSearchSection = (items: SearchItem[]): JSX.Element[] => {
		const list = items.map(item => {
			const url = new URL(item.url);
			return (
				<Command.Item
					key={item.id}
					className="cursor-pointer h-10 text-base flex items-center gap-2 px-2 text-black select-none will-change-auto transition-all duration-150 rounded-sm hover:bg-light-gray aria-selected:bg-light-gray"
				>
					<Link
						href={url.pathname}
						className="flex items-center w-full h-full"
						onClick={handleLinkClick}
					>
						<NextImage src="/document.svg" alt="Document Icon" width="24" height="24"></NextImage>
						<div>
							<span className="pl-2 text-slate-500">Go to </span>
							<span className="text-black">{item.title}</span>
						</div>
						<NextImage
							src="/arrow.svg"
							alt="Arrow Icon"
							width="18"
							height="18"
							className="ml-2"
						></NextImage>
					</Link>
				</Command.Item>
			);
		});

		return list;
	};

	if (snap.status === 'open') {
		return (
			<div
				className="z-40 fixed left-0 top-0  w-full h-full backdrop-blur-lg transition-all duration-150"
				data-overlay-wrapper
				onClick={e => closeOverlay(e)}
			>
				<div
					className="fixed left-0 top-0 w-full h-full bg-white opacity-70 "
					data-overlay-wrapper
				></div>{' '}
				<motion.div
					initial={{opacity: 0, scale: 0.5}}
					animate={{opacity: 1, scale: 1}}
					exit={{opacity: 0}}
					transition={{duration: 0.3}}
					data-overlay-wrapper
					className="fixed left-0 top-0 w-full h-full mx-auto flex flex-col justify-center"
				>
					<Command className="relative z-50 m-auto w-full max-w-2xl bg-white rounded-sm  shadow-2xl p-4 col-start-2 col-span-1 row-start-2 row-span-1 outline outline-1 outline-black">
						<div className="bg-light-gray w-min px-3 py-1 text-sm text-gray">{currentPage}</div>
						<div className="flex items-center">
							{/* <SearchIcon></SearchIcon> */}
							<Command.Input
								className="border-none w-full text-lg px-2 pt-4 pb-2 outline-none bg-transparent text-black placeholder:text-gray"
								autoFocus
								placeholder="Type a command or search..."
							/>
						</div>
						<hr className="w-full border border-light-gray mb-3" />

						<Command.List className="pb-4 h-64 overflow-y-scroll">
							{/* {loading && <Command.Loading>Hang on…</Command.Loading>} */}

							<Command.Empty>No results found.</Command.Empty>

							{searchItems.searchChildren && searchItems.searchChildren.length > 0 ? (
								<Command.Group heading="Auf dieser Seite" className={groupStyle}>
									{createSearchSection(searchItems.searchChildren)}
								</Command.Group>
							) : null}
							<Command.Group heading="Global" className={groupStyle}>
								{createSearchSection(searchItems.searchGlobal)}
							</Command.Group>

							<Command.Group heading="Alle Seiten" className={groupStyle}>
								{createSearchSection(searchItems.searchAll)}
							</Command.Group>

							{/* <Command.Group heading="Kategorien" className={groupStyle}>
								<Command.Item className={itemStyle}>
									<FileTextIcon></FileTextIcon>Apple
								</Command.Item>
							</Command.Group> */}
							{/* <Command.Group heading="Links" className={groupStyle}>
								{listItems}
							</Command.Group> */}
						</Command.List>
					</Command>
				</motion.div>
			</div>
		);
	}
	return <div></div>;
};

export default SearchOverlay;
