import Link from 'next/link';
const Card = () => {
	return (
		<div className="p-1 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
			<Link href="">
				<a className="block p-6 bg-white sm:p-8 rounded-xl">
					<div className="mt-16 sm:pr-8">
						<h5 className="text-xl font-bold text-gray-900">Science of Chemistry</h5>

						<p className="mt-2 text-sm text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, adipisci.
						</p>
					</div>
				</a>
			</Link>
		</div>
	);
};

export default Card;
