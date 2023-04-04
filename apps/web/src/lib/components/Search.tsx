'use client';
import {Search as SearchIcon} from 'react-feather';
import {searchStore, toggleSearchOverlay} from 'lib/stores/searchStore';
import {useSnapshot} from 'valtio';

const Search = (): JSX.Element | null => {
	useSnapshot(searchStore);

	return (
		<form onClick={() => toggleSearchOverlay('open')}>
			<div className="relative text-gray-600 focus-within:text-gray-400">
				<span className="absolute inset-y-0 left-0 flex items-center pl-2">
					<button
						title="search"
						type="submit"
						className="p-1 focus:outline-none focus:shadow-outline"
					>
						<i className="mx-1">
							<SearchIcon className="object-contain w-[18px] h-[18px]"></SearchIcon>
						</i>
					</button>
				</span>
				<input
					type="search"
					name="q"
					className="py-2 text-sm text-white bg-gray-200 rounded-md pl-10 outline outline-gray-300 hover:outline-gray-500  focus:outline-none focus:bg-white focus:text-gray-900"
					placeholder="Search..."
					autoComplete="off"
				/>
			</div>
		</form>
	);
};

export default Search;
