interface Props {
	meta: Page['meta'];
}

const SidebarMetadata = ({meta}: Props): JSX.Element | null => {
	if (typeof meta === 'string' || meta === null) {
		return null;
	}

	const Courses = () => {
		if (meta.courses && meta.courses.length > 0) {
			const coursesSplit = meta.courses.split(',');

			const courseNames = coursesSplit.map(course => {
				const courseTrimmed = course.trim();
				return (
					<span key={courseTrimmed} className="ml-1">
						{courseTrimmed}
					</span>
				);
			});

			return (
				<li className="flex">
					<span className="w-16">Fach:</span>
					{courseNames}
				</li>
			);
		} else {
			return null;
		}
	};

	return (
		<aside className="col-span-2 mt-36 ml-4 text-gray">
			{/* TODO: Placeholder for search shortcut */}
			{/* <Search></Search> */}

			<ul>
				{meta.author !== null ? (
					<li className="flex">
						<span className="w-16">Autor:</span>
						<span>{meta.author}</span>
					</li>
				) : null}
				<li className="flex">
					<span className="w-16">Datum:</span>
					<span>{meta.modified}</span>
				</li>
				<Courses></Courses>
			</ul>
		</aside>
	);
};

export default SidebarMetadata;
