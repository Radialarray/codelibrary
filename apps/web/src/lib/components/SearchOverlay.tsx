import {MouseEventHandler} from 'react';
import {Command} from 'cmdk';
import {motion} from 'framer-motion';

interface Props {
	open: boolean;
	openOverlay: MouseEventHandler;
	closeOverlay: MouseEventHandler;
}
const SearchOverlay = ({openOverlay, closeOverlay, open}: Props): JSX.Element => {
	const itemStyle = `cursor-pointer h-10 rounded-lg text-lg flex items-center gap-2 px-2  text-slate-600 select-none will-change-auto transition-all duration-150`;
	if (open === true) {
		return (
			<div
				className="z-40 fixed left-0 top-0 grid items-center w-full h-full backdrop-blur-lg transition-all duration-150"
				data-overlay-wrapper
				onClick={e => closeOverlay(e)}
			>
				<div
					className="fixed left-0 top-0 w-full h-full bg-white opacity-70"
					data-overlay-wrapper
				></div>{' '}
				<motion.div
					initial={{opacity: 0, scale: 0.5}}
					animate={{opacity: 1, scale: 1}}
					exit={{opacity: 0}}
					transition={{duration: 0.3}}
					data-overlay-wrapper
				>
					<Command className="relative z-50 m-auto w-full max-w-xl bg-slate-200 rounded-xl  shadow-2xl border-2 border-slate-300">
						<Command.Input
							className="border-none w-full text-lg px-4 py-4 outline-none bg-transparent text-slate-600 placeholder:text-slate-400"
							autoFocus
							placeholder="Type a command or search..."
						/>
						<hr className="w-full border border-slate-300 mb-3" />

						<Command.List className="px-4 pb-4">
							{/* {loading && <Command.Loading>Hang on…</Command.Loading>} */}

							<Command.Empty>No results found.</Command.Empty>

							<Command.Group
								heading="Vorschläge"
								className="select-none text-sm text-slate-400 mt-4 "
							>
								<Command.Item className={itemStyle}>Apple</Command.Item>
								<Command.Item className={itemStyle}>Orange</Command.Item>
								<Command.Item className={itemStyle}>Pear</Command.Item>
								<Command.Item className={itemStyle}>Blueberry</Command.Item>
							</Command.Group>

							<Command.Group
								heading="Vorschläge"
								className="select-none text-sm text-slate-400 mt-4 "
							>
								<Command.Item className={itemStyle}>Fish</Command.Item>
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
