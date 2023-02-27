import {MouseEventHandler} from 'react';
import {Command} from 'cmdk';
import {motion} from 'framer-motion';
import {Search as SearchIcon, FileText as FileTextIcon} from 'react-feather';
import Link from 'next/link';
import {useSnapshot} from 'valtio';
import {searchStore} from 'lib/stores/searchStore';

interface Props {
	closeOverlay: MouseEventHandler;
	searchItems: SearchItem[];
}

const SearchOverlay = ({closeOverlay, searchItems}: Props): JSX.Element => {
	const snap = useSnapshot(searchStore);
	// console.log(snap);

	const groupStyle = `select-none text-sm text-slate-400 mt-4`;
	const itemStyle = `cursor-pointer h-10 text-md flex items-center gap-2 px-2  text-black select-none will-change-auto transition-all duration-150 rounded-md`;

	// console.log(searchItems);
	const listItems = searchItems.map(item => {
		const url = new URL(item.url);
		return (
			<Command.Item key={item.id} className={itemStyle}>
				<Link href={url.pathname} className="flex items-center">
					<FileTextIcon></FileTextIcon>
					<div>
						<span className="pl-2 text-slate-500">Go to </span>
						<span className="text-blue-500">{item.title}</span>
					</div>
				</Link>
			</Command.Item>
		);
	});

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
					className="fixed left-0 top-0 w-full h-full grid grid-cols-3 grid-rows-3 items-center"
				>
					<Command className="relative z-50 m-auto w-full max-w-2xl bg-white rounded-xl  shadow-2xl px-2 col-start-2 col-span-1 row-start-2 row-span-1 ">
						<div className="flex items-center">
							<SearchIcon></SearchIcon>
							<Command.Input
								className="border-none w-full text-lg px-2 py-4 outline-none bg-transparent text-slate-600 placeholder:text-slate-400"
								autoFocus
								placeholder="Type a command or search..."
							/>
						</div>
						<hr className="w-full border border-slate-300 mb-3" />

						<Command.List className="pb-4 h-64 overflow-y-scroll">
							{/* {loading && <Command.Loading>Hang on…</Command.Loading>} */}

							<Command.Empty>No results found.</Command.Empty>

							<Command.Group heading="Kategorien" className={groupStyle}>
								<Command.Item className={itemStyle}>
									<FileTextIcon></FileTextIcon>Apple
								</Command.Item>
							</Command.Group>
							<Command.Group heading="Links" className={groupStyle}>
								{listItems}
							</Command.Group>
						</Command.List>
					</Command>
				</motion.div>
			</div>
		);
	}
	return <div></div>;
};

export default SearchOverlay;
